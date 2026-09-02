// scripts/generators/ai-ml.js
// Exhaustive, original, high-accuracy skills for AI & Machine Learning

module.exports = {
  'mcp-model-context-protocol': `---
name: mcp-model-context-protocol
description: Implement standardized Model Context Protocol (MCP) servers, resources, tools, and JSON-RPC 2.0 transport bridges for Claude, Cursor, and agent hosts.
license: MIT
version: 1.2.0
---

# Model Context Protocol (MCP) Server Architecture & Implementation

## Overview
The Model Context Protocol (MCP) is an open standard created by Anthropic that enables AI assistants to securely interface with local and remote data sources, tool environments, and custom workflows. An MCP server exposes three foundational capabilities:
1. **Resources**: URI-addressable read-only data payloads (e.g., \`file:///logs/app.log\`, \`postgres:///public/orders\`).
2. **Tools**: Executable functions callable by the client model with strict JSON Schema parameters and side-effect controls.
3. **Prompts**: Pre-configured prompt templates with parameter substitution for guided user workflows.

## 1. Transport Layer Architecture
MCP supports two primary transport mechanisms:
- **Stdio Transport**: Subprocess-based communication over standard input/output streams. Ideal for local desktop tools, local database explorers, and CLI integrations (e.g., Claude Desktop, Cursor).
- **Server-Sent Events (SSE) Transport**: HTTP POST + SSE streams for remote or containerized MCP servers.

### Stdio Transport Protocol Invariants
- **Never print unstructured logging to \`stdout\`**. \`stdout\` is strictly reserved for valid JSON-RPC 2.0 frames.
- All application diagnostic messages must go to \`stderr\` (e.g. \`console.error\` or \`logging.error\`).
- Every request must return a response matching the \`id\` or return a standard JSON-RPC error.

## 2. Production TypeScript MCP Server Implementation
\`\`\`typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// 1. Initialize Server Metadata
const server = new Server(
  {
    name: 'enterprise-workspace-bridge',
    version: '1.2.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// 2. Define Tool Contracts
const QueryDatabaseSchema = z.object({
  table: z.string().min(1).regex(/^[a-zA-Z0-9_]+$/),
  limit: z.number().int().positive().max(100).default(20),
  conditions: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

// 3. Register Available Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'query_table',
        description: 'Securely query structured enterprise table records with parameterized filtering.',
        inputSchema: {
          type: 'object',
          properties: {
            table: { type: 'string', description: 'Target database table name' },
            limit: { type: 'integer', default: 20, description: 'Max row count' },
            conditions: {
              type: 'object',
              additionalProperties: true,
              description: 'Key-value equality filter conditions',
            },
          },
          required: ['table'],
        },
      },
    ],
  };
});

// 4. Handle Tool Execution with Schema Validation & Error Sandboxing
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'query_table') {
    const parseResult = QueryDatabaseSchema.safeParse(args);
    if (!parseResult.success) {
      throw new McpError(
        ErrorCode.InvalidParams,
        \`Validation failed: \${parseResult.error.errors.map((e) => e.message).join(', ')}\`
      );
    }

    const { table, limit, conditions } = parseResult.data;

    try {
      // Execute sanitized query via connection pool
      const records = await executeSafeQuery(table, limit, conditions);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(records, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: \`Database query failed: \${err.message}\`,
          },
        ],
      };
    }
  }

  throw new McpError(ErrorCode.MethodNotFound, \`Unknown tool: \${name}\`);
});

// 5. Start Server on Stdio Transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[MCP Server] Enterprise Workspace Bridge running on stdio');
}

main().catch((err) => {
  console.error('[MCP Server] Fatal initialization error:', err);
  process.exit(1);
});
\`\`\`

## 3. Host Configuration Standards

### Claude Desktop (\`claude_desktop_config.json\`)
\`\`\`json
{
  "mcpServers": {
    "enterprise-bridge": {
      "command": "node",
      "args": ["/usr/local/bin/enterprise-bridge/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://app:secret@127.0.0.1:5432/workspace",
        "NODE_ENV": "production"
      }
    }
  }
}
\`\`\`

### Cursor / Antigravity MCP Integration
Configure under \`.agents/mcp_config.json\`:
\`\`\`json
{
  "servers": {
    "local-mcp": {
      "transport": "stdio",
      "command": "python",
      "args": ["-m", "mcp_server_module"]
    }
  }
}
\`\`\`

## 4. Security Rules & Anti-Patterns
- ❌ **Do not write debug statements to \`stdout\`**: Even a single \`console.log("hello")\` corrupts the JSON-RPC frame and breaks the client connection.
- ❌ **Do not bypass parameter validation**: Always validate tool inputs with strict schemas (e.g. Zod or Pydantic) to prevent SQL injection or path traversal.
- ❌ **Do not leak raw filesystem paths**: Always resolve and constrain resource paths against an explicit whitelist base directory.
- ❌ **Do not leave error responses uncaught**: Unhandled rejections terminate the process, severing the agent host bridge.
`,

  'langchain-agentic-tool-orchestration': `---
name: langchain-agentic-tool-orchestration
description: Build autonomous stateful agent graphs, structured tool calling with Pydantic validation, human-in-the-loop checkpoints, and streaming with LangGraph.
license: MIT
version: 1.0.0
---

# LangChain Agentic Tool Orchestration with LangGraph

## Overview
Modern agentic architectures move beyond naive zero-shot ReAct chains to **stateful directed cyclical graphs (StateGraph)**. Using LangChain and LangGraph, agents execute structured reasoning loops, inspect intermediate tool outputs, handle conditional routing, request human approval for critical side-effects, and persist execution state across multiple conversation turns.

## 1. Core Architecture Invariants
- **Schema-Enforced Tools**: Every tool parameter must be defined using Pydantic v2 models with explicit field descriptions. Docstrings on tool functions serve as natural-language instructions to the LLM.
- **Stateful Memory Graph**: The graph state (\`TypedDict\` with annotated reducers like \`add_messages\`) maintains conversational context and tool call execution history.
- **Interruptible Checkpoints**: Sensitive operations (e.g., executing DB mutations, sending emails) must pause execution using graph interrupt gates until an external human approval signal is posted.

## 2. Complete Production Implementation (Python)
\`\`\`python
from typing import Annotated, TypedDict, Literal
from pydantic import BaseModel, Field
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import MemorySaver

# 1. Structured Tool Schemas with Strict Pydantic Contracts
class SQLQueryInput(BaseModel):
    query: str = Field(..., description="Read-only SELECT query to execute against the analytics schema.")
    limit: int = Field(default=25, description="Maximum number of rows to return (capped at 100).")

@tool("execute_sql_query", args_schema=SQLQueryInput)
def execute_sql_query(query: str, limit: int = 25) -> str:
    """Execute a parameterized read-only SQL query against the analytics warehouse."""
    cleaned = query.strip().rstrip(";")
    if not cleaned.upper().startswith("SELECT"):
        return "Error: Non-SELECT queries are prohibited by the safety policy."
    
    # Secure query execution simulation
    return f"Success: Returned {min(limit, 100)} records for query: {cleaned}"

tools = [execute_sql_query]
tool_node = ToolNode(tools)

# 2. Agent Graph State Specification
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    iteration_count: int
    authorized_for_mutation: bool

# 3. Model Binding with Tool Capabilities
model = ChatOpenAI(model="gpt-4o", temperature=0).bind_tools(tools)

def agent_reasoning_node(state: AgentState) -> dict:
    """Invokes LLM with current message history and determines next action."""
    messages = state["messages"]
    response = model.invoke(messages)
    return {
        "messages": [response],
        "iteration_count": state.get("iteration_count", 0) + 1
    }

# 4. Conditional Edge Routing Logic
def should_continue(state: AgentState) -> Literal["tools", "__end__"]:
    last_message = state["messages"][-1]
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        # Guard against runaway agent execution loops
        if state.get("iteration_count", 0) > 10:
            return END
        return "tools"
    return END

# 5. Graph Compilation with State Checkpointing
workflow = StateGraph(AgentState)
workflow.add_node("agent", agent_reasoning_node)
workflow.add_node("tools", tool_node)

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
workflow.add_edge("tools", "agent")

# Enable in-memory checkpointing for state recovery and human-in-the-loop
checkpointer = MemorySaver()
app = workflow.compile(checkpointer=checkpointer)
\`\`\`

## 3. Streaming and Execution Lifecycle
\`\`\`python
# Thread-isolated multi-turn interaction
config = {"configurable": {"thread_id": "session-prod-994"}}

async def run_agent_turn(user_prompt: str):
    inputs = {"messages": [HumanMessage(content=user_prompt)], "iteration_count": 0}
    async for event in app.astream_events(inputs, config=config, version="v2"):
        kind = event["event"]
        if kind == "on_chat_model_stream":
            content = event["data"]["chunk"].content
            if content:
                print(content, end="", flush=True)
        elif kind == "on_tool_start":
            print(f"\\n[Calling Tool]: {event['name']} with args {event['data'].get('input')}")
\`\`\`

## 4. Anti-Patterns & Best Practices
- ❌ **Unconstrained Iterations**: Agents without \`iteration_count\` thresholds can loop infinitely on hallucinated or failed tool errors.
- ❌ **Lack of Error Handling in Tools**: If a tool raises an unhandled Python exception, the entire graph crashes. Return error messages as strings to allow the model to self-correct.
- ❌ **Overloading Single Agents with >10 Tools**: Degrades tool selection precision by up to 40%. Use hierarchical supervisor routing or specialist sub-agents for larger toolsets.
`,

  'llamaindex-hierarchical-rag': `---
name: llamaindex-hierarchical-rag
description: Build production hierarchical RAG with auto-merging retrievers, recursive node parsing, parent-child document chunking, and contextual compression.
license: MIT
version: 1.1.0
---

# LlamaIndex Hierarchical RAG & Auto-Merging Retrievers

## Overview
Naive RAG fails when chunks are either too small (losing document-level context) or too large (diluting embedding specificity). **Hierarchical RAG with Auto-Merging Retrieval** solves this by creating a multi-tier tree of chunks:
1. **Child Nodes (Small, e.g. 128 tokens)**: Embeddings are calculated on child nodes for surgical semantic search.
2. **Parent Nodes (Medium, e.g. 512 tokens)**: If a critical threshold of child nodes match a query, the retriever automatically swaps the children for their shared parent chunk before feeding to the LLM.
3. **Root Documents (Large, e.g. 2048 tokens)**: Provides full section context when entire topics are referenced.

## 1. Node Hierarchy Construction
\`\`\`python
from llama_index.core import SimpleDirectoryReader, StorageContext
from llama_index.core.node_parser import HierarchicalNodeParser, get_leaf_nodes
from llama_index.core.storage.docstore import SimpleDocumentStore
from llama_index.core import VectorStoreIndex
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.retrievers import AutoMergingRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SentenceTransformerRerank

# 1. Load Source Documents
documents = SimpleDirectoryReader("./enterprise_docs").load_data()

# 2. Configure Multi-Level Hierarchical Parser (Parent: 1024 tokens, Child: 256 tokens)
node_parser = HierarchicalNodeParser.from_defaults(
    chunk_sizes=[1024, 256],
    chunk_overlap=32
)

nodes = node_parser.get_nodes_from_documents(documents)
leaf_nodes = get_leaf_nodes(nodes)

# 3. Store Complete Node Graph in Document Store
docstore = SimpleDocumentStore()
docstore.add_documents(nodes)

storage_context = StorageContext.from_defaults(docstore=docstore)

# 4. Index ONLY Leaf Nodes for Precise Vector Retrieval
embed_model = OpenAIEmbedding(model="text-embedding-3-small")
vector_index = VectorStoreIndex(
    leaf_nodes,
    storage_context=storage_context,
    embed_model=embed_model
)

# 5. Build Auto-Merging Retriever with Context Reconstruction
base_retriever = vector_index.as_retriever(similarity_top_k=12)

auto_merging_retriever = AutoMergingRetriever(
    base_retriever,
    storage_context=storage_context,
    simple_ratio_thresh=0.5,  # If >50% of sibling chunks match, merge to parent
    verbose=True
)

# 6. Apply Cross-Encoder Reranker for Maximum Precision
reranker = SentenceTransformerRerank(
    model="cross-encoder/ms-marco-MiniLM-L-6-v2",
    top_n=4
)

# 7. Construct Final Query Engine
query_engine = RetrieverQueryEngine.from_args(
    auto_merging_retriever,
    node_postprocessors=[reranker],
    llm=OpenAI(model="gpt-4o", temperature=0.1)
)

response = query_engine.query("Explain the disaster recovery protocol for database failures.")
print(str(response))
\`\`\`

## 2. Best Practices & Invariants
- **Always index leaf nodes only**: Indexing parent and leaf nodes simultaneously causes duplicate entries and degrades cosine similarity precision.
- **Tune \`simple_ratio_thresh\`**: A threshold of 0.5 (50%) provides the ideal balance between specificity and complete context restoration.
- **Rerank after auto-merging**: Always apply a cross-encoder reranker after the parent nodes have been restored.
`,

  'crewai-task-delegation': `---
name: crewai-task-delegation
description: Coordinate multi-agent collaborative workflows using CrewAI, hierarchical process execution, custom tool assignment, and structured memory.
license: MIT
version: 1.0.0
---

# CrewAI Autonomous Multi-Agent Collaboration

## Overview
CrewAI organizes autonomous AI agents into high-performance collaborative teams. Each agent is modeled with an explicit **Role**, **Backstory**, **Goal**, and **Tool Access**. Crews operate either sequentially or under a **Hierarchical Process** governed by a Manager LLM that automatically delegates sub-tasks, reviews worker output, and ensures mission completion.

## 1. Multi-Agent Team Architecture
\`\`\`python
from crewai import Agent, Task, Crew, Process
from crewai.tools import tool
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o", temperature=0.2)

# 1. Define Specialized Tool
@tool("fetch_repo_vulnerabilities")
def fetch_repo_vulnerabilities(repo_name: str) -> str:
    """Fetch recent security audit and dependency CVE reports for a repository."""
    return f"CVE Report for {repo_name}: 1 Critical (CVE-2024-3801), 2 Medium dependencies."

# 2. Configure Specialized Agents
security_auditor = Agent(
    role="Principal Security Auditor",
    goal="Identify and categorize CVE vulnerabilities across repository components.",
    backstory="You are a veteran Application Security engineer specialized in automated CVE detection and threat modeling.",
    verbose=True,
    memory=True,
    tools=[fetch_repo_vulnerabilities],
    llm=llm
)

lead_remediator = Agent(
    role="Lead Systems Engineer",
    goal="Formulate actionable patching strategies and pull request specifications for detected CVEs.",
    backstory="You are an expert full-stack developer who transforms security findings into minimal, zero-regression code fixes.",
    verbose=True,
    memory=True,
    llm=llm
)

# 3. Define Dependent Tasks
audit_task = Task(
    description="Analyze {repository_url} and generate an itemized list of security vulnerabilities.",
    expected_output="A structured markdown report listing CVE IDs, affected libraries, and severity scores.",
    agent=security_auditor
)

remediation_task = Task(
    description="Based on the audit report, create step-by-step upgrade instructions and validation test requirements.",
    expected_output="A comprehensive remediation guide with version pins, breaking change alerts, and smoke tests.",
    agent=lead_remediator
)

# 4. Orchestrate Crew Execution
security_crew = Crew(
    agents=[security_auditor, lead_remediator],
    tasks=[audit_task, remediation_task],
    process=Process.sequential,  # Or Process.hierarchical with manager_llm
    verbose=True
)

result = security_crew.kickoff(inputs={"repository_url": "github.com/enterprise/gateway-service"})
print(result)
\`\`\`
`,

  'openai-function-calling-structured-outputs': `---
name: openai-function-calling-structured-outputs
description: Master OpenAI strict mode JSON schemas, response_format structured outputs, parallel tool calling, and streaming function calls.
license: MIT
version: 1.3.0
---

# OpenAI Structured Outputs & Strict Tool Calling

## Overview
OpenAI's **Structured Outputs** guarantees 100% adherence to supplied JSON Schemas via constrained grammar-based decoding. This eliminates parse failures, missing required fields, and hallucinated schema keys across both \`response_format\` mode and tool/function calling.

## 1. Strict Mode JSON Schema Rules
To enable OpenAI \`strict: true\` mode, schemas must adhere to strict constraints:
- \`additionalProperties: false\` must be explicitly set on all object definitions.
- **Every single key** in \`properties\` must be explicitly listed in the \`required\` array.
- Optional fields must be expressed as a union with \`null\` (e.g., \`type: ["string", "null"]\`).
- Recursive references and non-standard JSON schema keywords are disallowed.

## 2. Production Python Implementation (Pydantic v2 + Strict Mode)
\`\`\`python
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import Optional

client = OpenAI()

class DependencyIssue(BaseModel):
    package_name: str = Field(description="Name of the affected package")
    installed_version: str = Field(description="Currently installed semantic version")
    fixed_version: Optional[str] = Field(None, description="Minimum safe version to upgrade to")
    severity: str = Field(description="Severity: CRITICAL, HIGH, MEDIUM, LOW")

class SecurityAuditReport(BaseModel):
    audit_id: str
    target_environment: str
    total_scanned: int
    vulnerabilities: list[DependencyIssue]
    passed_compliance_gate: bool

# Extract with 100% Guaranteed Schema Conformance
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "You are an automated security auditor. Extract and classify all dependency vulnerabilities from the scan text."},
        {"role": "user", "content": "Scan log: lodash 4.17.15 contains prototype pollution (CVE-2019-10744, HIGH). Fixed in 4.17.21. Total packages: 420."}
    ],
    response_format=SecurityAuditReport,
)

report = completion.choices[0].message.parsed
print(f"Audit {report.audit_id}: Passed={report.passed_compliance_gate}, Issues={len(report.vulnerabilities)}")
\`\`\`
`,

  'anthropic-claude-tool-use-artifacts': `---
name: anthropic-claude-tool-use-artifacts
description: Master Claude 3.5 Sonnet tool use, prompt caching, computer use specifications, and strict token streaming protocols.
license: MIT
version: 1.2.0
---

# Anthropic Claude Tool Use & Prompt Caching Architecture

## Overview
Anthropic's Claude 3.5 Sonnet provides industry-leading tool calling, visual artifact generation, and prompt caching. Claude supports explicit tool choice (\`tool_choice: {"type": "tool", "name": "..."}\`), multi-turn tool-result loops, and fine-grained prompt caching that reduces latency by up to 80% and API costs by up to 90%.

## 1. Prompt Caching Protocol
Place high-token immutable context (system instructions, tool declarations, reference documentation) behind \`cache_control: {"type": "ephemeral"}\`. Cached prefixes must contain at least 1,024 tokens to activate cache writes.

## 2. Complete TypeScript Implementation
\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function runClaudeToolLoop() {
  const tools: Anthropic.Tool[] = [
    {
      name: 'execute_terminal_command',
      description: 'Execute a verified command in the isolated workspace terminal environment.',
      input_schema: {
        type: 'object',
        properties: {
          command: { type: 'string', description: 'Shell command string to run' },
          timeout_seconds: { type: 'integer', default: 30 },
        },
        required: ['command'],
      },
    },
  ];

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: 'You are an autonomous engineering agent with verified terminal tool access.',
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: tools,
    messages: [
      {
        role: 'user',
        content: 'Check the git status and list any uncommitted files in the repository.',
      },
    ],
  });

  for (const block of response.content) {
    if (block.type === 'tool_use') {
      console.log(\`Tool invoked: \${block.name} (id: \${block.id})\`, block.input);
      // Execute command and return tool_result block in next message
    }
  }
}
\`\`\`
`,

  'pgvector-hybrid-bm25-search': `---
name: pgvector-hybrid-bm25-search
description: Implement enterprise hybrid search combining PostgreSQL pgvector cosine embeddings with full-text BM25 and Reciprocal Rank Fusion (RRF).
license: MIT
version: 1.4.0
---

# PostgreSQL Hybrid Search: pgvector + BM25 Full-Text & RRF

## Overview
Pure vector search often fails on exact keyword queries (serial numbers, code symbols, acronyms), while full-text search misses semantic synonyms. **Hybrid Search** combines dense vector embeddings with PostgreSQL \`tsvector\` keyword indexes, merging the results using **Reciprocal Rank Fusion (RRF)** for optimal retrieval accuracy.

## 1. Database Schema & Index Design
\`\`\`sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create document table with both vector and tsvector fields
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(1536) NOT NULL,
    tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);

-- HNSW Vector Index (Fast approximate nearest neighbors)
CREATE INDEX idx_documents_embedding_hnsw 
ON documents USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- GIN Full-Text Index (BM25 keyword search)
CREATE INDEX idx_documents_tsv_gin 
ON documents USING gin(tsv);
\`\`\`

## 2. Reciprocal Rank Fusion (RRF) Query
\`\`\`sql
WITH semantic_search AS (
    SELECT id, RANK() OVER (ORDER BY embedding <=> $1::vector) as rank
    FROM documents
    ORDER BY embedding <=> $1::vector
    LIMIT 40
),
keyword_search AS (
    SELECT id, RANK() OVER (ORDER BY ts_rank_cd(tsv, plainto_tsquery('english', $2)) DESC) as rank
    FROM documents
    WHERE tsv @@ plainto_tsquery('english', $2)
    ORDER BY ts_rank_cd(tsv, plainto_tsquery('english', $2)) DESC
    LIMIT 40
)
SELECT 
    d.id,
    d.content,
    d.metadata,
    COALESCE(1.0 / (60 + s.rank), 0.0) +
    COALESCE(1.0 / (60 + k.rank), 0.0) AS rrf_score
FROM documents d
LEFT JOIN semantic_search s ON d.id = s.id
LEFT JOIN keyword_search k ON d.id = k.id
WHERE s.id IS NOT NULL OR k.id IS NOT NULL
ORDER BY rrf_score DESC
LIMIT 10;
\`\`\`
`
};
