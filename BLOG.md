# DomoSkills: The Open Agent Skills Marketplace for AI Coding Agents

**Published:** September 2026  
**Author & Creator:** Arron Parejas ([@darknecrocities](https://github.com/darknecrocities))  
**Website:** [https://web-beta-six-81.vercel.app/](https://web-beta-six-81.vercel.app/)  
**GitHub Repository:** [https://github.com/darknecrocities/DomoSkills](https://github.com/darknecrocities/DomoSkills)  
**License:** MIT  

---

```text
DOMOSKILLS_
Open skills. Smarter agents. Your stack.
```

## Introduction: The Autonomous Coding Revolution Needs Standards

In 2026, software development reached a historic inflection point. Autonomous AI coding assistants—from **Google Antigravity** and **Claude Code** to **Cursor IDE**, **OpenCode Interpreter**, **OpenAI Codex**, and **GitHub Copilot**—have moved from experimental chat widgets to indispensable daily pair programmers. Developers now spend significant time steering autonomous agents across complex refactors, distributed architectures, and full-stack implementations.

However, as agent autonomy expanded, a critical friction point emerged: **Agent Capability Fragmentation**.

Every AI coding environment requires prompt guidance, behavioral rules, architectural constraints, and tool knowledge. Yet, developers were forced to reinvent the wheel for every repository:
- Copy-pasting unstructured markdown prompts between `.cursorrules`, `.claude/skills/`, and `.agents/`.
- Lacking security validation, blindly running untrusted community prompts that execute shell scripts.
- Dealing with agent drift where AI assistants hallucinate outdated APIs or ignore security guardrails.
- Suffering from zero version control or team reproducibility for agent capabilities.

To solve this systemic bottleneck, I created **DomoSkills**: the open-source capability registry, multi-agent adapter, and zero-friction CLI package manager built specifically for the modern era of AI coding agents.

---

## ⚡ What is DomoSkills?

**DomoSkills** ([web-beta-six-81.vercel.app](https://web-beta-six-81.vercel.app/)) is an end-to-end ecosystem designed to discover, validate, install, and standardize modular agent capabilities (`SKILL.md`). Think of it as **npm or Homebrew for AI Agent Skills**.

Instead of writing custom system prompts, tool schemas, and project constraints from scratch, DomoSkills gives engineering teams instant access to **over 1,000+ curated, production-grade capabilities** spanning 12 software domains—installable with a single terminal command.

```bash
# Install frontend performance and OWASP security capabilities
npx domoskills add react-performance owasp-agent-guardian

# Target a specific AI coding assistant
npx domoskills add fastapi-clean-architecture --agent cursor
npx domoskills add rag-pipeline-architect --agent claude
```

---

## 🛡️ The 4 Foundational Pillars of DomoSkills

When designing DomoSkills, my goal was not just to create another prompt list, but to engineer a robust, enterprise-ready software distribution system. DomoSkills is built on four core architectural pillars:

### 1. Universal Multi-Agent Adapter Engine
AI coding tools are diverse, and development teams should never be locked into a single vendor. DomoSkills features a zero-configuration multi-agent adapter layer that understands the exact directory schemas, configuration markers, and file conventions of all leading AI agent environments:

| Agent Target | Flag | Destination Directory | Configuration Marker |
| :--- | :--- | :--- | :--- |
| **Universal Standard** | `--agent universal` | `.agent/skills/<name>/` | `.agent/agent.yaml` |
| **Anthropic Claude Code** | `--agent claude` | `.claude/skills/<name>/` | `.claude/config.json` |
| **Cursor IDE** | `--agent cursor` | `.cursor/skills/<name>/` | `.cursorrules` |
| **Google Antigravity / Gemini** | `--agent gemini` | `.gemini/skills/<name>/` | `.gemini/config/skills` |
| **OpenCode Interpreter** | `--agent opencode` | `.opencode/skills/<name>/` | `.opencode/opencode.json` |
| **OpenAI Codex / Agents** | `--agent codex` | `.agents/skills/<name>/` | `.agents/manifest.json` |
| **GitHub Copilot** | `--agent copilot` | `.github/skills/<name>/` | `.github/copilot-instructions.md` |

When you run `npx domoskills add <skill>`, the engine automatically inspects your repository, detects your active agent workspace, and generates the properly formatted skill files directly where your assistant expects them.

---

### 2. Zero-Execution AST Security Engine
Installing third-party instructions into an agent with bash execution permissions carries severe supply-chain risks. A malicious skill could prompt an agent to exfiltrate environment secrets or execute destructive commands.

To protect developers, DomoSkills includes a built-in, zero-execution **Abstract Syntax Tree (AST) & Regex Security Engine**:
- **100-Point Security Scoring**: Every capability is continuously evaluated and assigned a transparent security tier (`Verified Tier 1`, `Community Tier 2`, or `Experimental Tier 3`).
- **OWASP Compliance**: Automated detection of destructive commands (`rm -rf /`, `mkfs`), dangerous piped downloads (`curl | bash`, `wget | sh`), reverse shells, and base64-encoded payloads.
- **Path Traversal Shielding**: Hardened path normalization preventing `../` directory escapes and unauthorized filesystem tampering.
- **Secret & Token Leak Detection**: Scans for embedded private keys, AWS tokens, and API credentials before any skill is indexed or installed.

Skills that fall below strict safety thresholds are automatically quarantined.

---

### 3. Reproducible `domoskills.json` Lockfile
Modern engineering teams require deterministic setups. DomoSkills introduces the `domoskills.json` lockfile to lock down your project's AI capabilities into git version control.

```json
{
  "version": 1,
  "agent": "cursor",
  "skills": [
    {
      "name": "react-performance",
      "source": "domoskills/official-agent-skills",
      "version": "1.4.2",
      "checksum": "sha256-7f9a12c4b8e...",
      "installedAt": "2026-09-02T10:15:00.000Z"
    },
    {
      "name": "owasp-agent-guardian",
      "source": "domoskills/official-agent-skills",
      "version": "1.2.0",
      "checksum": "sha256-b3e412f910a...",
      "installedAt": "2026-09-02T10:15:02.000Z"
    }
  ]
}
```

Whenever a new engineer clones your repository, or a CI/CD pipeline spins up a headless container, a single command restores the identical agent skill stack:

```bash
npx domoskills install
```

---

### 4. Over 1,000+ Curated Capabilities Across 12 Domains
DomoSkills launches with over 1,000 production-ready skills categorized for immediate real-world use:
- **Frontend & Frameworks**: Next.js 14 App Router, React 19 Server Components, Vue 3 Composition, SvelteKit, Tailwind CSS.
- **Backend & APIs**: FastAPI clean architecture, NestJS microservices, Go Gin, Rust Actix-web, GraphQL Federation.
- **Databases & ORMs**: PostgreSQL query optimization, Prisma patterns, Supabase Row-Level Security, Redis cache-aside.
- **DevOps & Cloud**: Docker multi-stage builds, Kubernetes Helm charts, Terraform AWS modules, GitHub Actions CI/CD.
- **Security & Privacy**: Zero Trust API hardening, JWT/OAuth2 rotation, OWASP Top 10 mitigation, sanitized canvas exports.
- **AI/ML & Local LLMs**: Ollama local inference integration, RAG pipeline architecture, WebGPU acceleration, LangChain workflows.

---

## 💻 The Developer CLI: Complete Command Toolkit

The `domoskills` CLI is built for speed and developer ergonomics:

```bash
# 1. Initialize configuration in your project
npx domoskills init

# 2. Search capabilities right from your terminal
npx domoskills search nextjs
npx domoskills search security --category devops

# 3. Add skills with specific agent routing
npx domoskills add docker-architect --agent claude

# 4. Diagnose your workspace health and configuration hooks
npx domoskills doctor

# 5. Audit all installed skills for security flags and updates
npx domoskills audit

# 6. List all active capabilities in the project
npx domoskills list
```

---

## 🌐 The DomoSkills Web Portal: A Visual Discovery Engine

Complementing the terminal CLI is the official web portal at [https://web-beta-six-81.vercel.app/](https://web-beta-six-81.vercel.app/), crafted with Next.js 14, Tailwind CSS, Framer Motion, and Zustand:

- **Faceted Search & Density Modes**: Switch fluidly between Card Grid, Compact Data Table, and Detailed List layouts.
- **Side-by-Side Skill Comparator**: Compare up to 4 capabilities simultaneously across AST safety scores, memory footprint, trigger tags, and licenses.
- **Interactive Stack Cart**: Add skills to a temporary drawer with a fly-to-cart micro-interaction to generate custom compound installation commands.
- **Global Command Palette (`Cmd+K`)**: Keyboard-first navigation across all 1,000+ capabilities and platform diagnostics.
- **Web Agent Doctor (`/doctor`)**: Interactive browser scanner that verifies local agent directories and environment variables.
- **Visual Submission Studio (`/submit`)**: Visual `SKILL.md` authoring studio with real-time YAML frontmatter linting and AST security pre-flight checks.

---

## 🤝 Synergistic Ecosystem: DomoSkills & DomoDomo

DomoSkills is also deeply integrated with **DomoDomo** ([github.com/darknecrocities/DomoDomo---All-in-one-Tool](https://github.com/darknecrocities/DomoDomo---All-in-one-Tool)), my privacy-first client-side toolbox:

1. **In-App Tool Hub (`/tool/domoskills`)**: Access and browse the live DomoSkills registry right inside DomoDomo's offline sandbox.
2. **One-Click Command Generator**: Assemble composite commands and copy them instantly to your clipboard.
3. **Skill Creator Bridge**: Design visual capabilities in DomoDomo and export them directly to the DomoSkills community marketplace.

---

## 🚀 Get Started Today

DomoSkills is 100% free, open source, and ready for you to supercharge your AI coding assistant:

- 🌐 **Web Platform:** [https://web-beta-six-81.vercel.app/](https://web-beta-six-81.vercel.app/)
- 📦 **CLI Installation:** `npx domoskills init`
- ⭐ **GitHub Repository:** [https://github.com/darknecrocities/DomoSkills](https://github.com/darknecrocities/DomoSkills)
- 💡 **Submit a Skill:** Open a pull request or use the [Visual Submission Studio](https://web-beta-six-81.vercel.app/submit).

The future of software engineering is collaborative between human engineers and autonomous agents. With DomoSkills, we are providing the structured capabilities, security standards, and cross-platform flexibility developers need to build with confidence.

---

*Created with passion by **Arron Parejas** ([@darknecrocities](https://github.com/darknecrocities/DomoSkills)). Pull requests, feedback, and new agent skills are warmly welcome!*
