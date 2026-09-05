export interface BundlePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  skillSlugs: string[];
  recommendedAgent: string;
}

export const BUNDLE_PRESETS: BundlePreset[] = [
  {
    id: 'autonomous-ai-engineer',
    name: 'Autonomous AI Engineer Stack',
    badge: 'Trending LLM Stack',
    description: 'Complete cyclical multi-agent workflows, speculative inference, hierarchical RAG, and vector storage.',
    skillSlugs: [
      'langgraph-cyclical-state-graphs',
      'vllm-speculative-decoding',
      'pgvector-hybrid-search',
      'rag-llamaindex-hierarchical',
    ],
    recommendedAgent: 'Antigravity (.agent)',
  },
  {
    id: 'devsecops-hardening',
    name: 'DevSecOps & Cloud Hardening',
    badge: 'Security Verified',
    description: 'Automated container vulnerability scanning, SBOM tracking, GitOps CD, and RS256 token verification.',
    skillSlugs: [
      'trivy-container-sarif-scanner',
      'syft-cyclonedx-spdx-sbom',
      'argocd-gitops-kubernetes-deployments',
      'jwt-rs256-verification-security',
    ],
    recommendedAgent: 'Universal (.agent)',
  },
  {
    id: 'fullstack-ts-pro',
    name: 'Fullstack TypeScript Pro',
    badge: 'High Performance',
    description: 'Next.js Turbopack server actions, type-safe Drizzle ORM relations, and ultra-fast edge APIs.',
    skillSlugs: [
      'nextjs-15-turbopack-server-actions',
      'drizzle-orm-schema-relations',
      'hono-ultrafast-edge-api',
      'tanstack-query-v5-optimistic-cache',
    ],
    recommendedAgent: 'Claude Code (.claude)',
  },
  {
    id: 'llmops-inference-lab',
    name: 'High-Throughput LLMOps Lab',
    badge: 'Production Grade',
    description: 'PagedAttention inference servers, ZeRO-3 distributed training, and real-time OLAP telemetry.',
    skillSlugs: [
      'vllm-high-throughput-llm-serving',
      'deepspeed-zeRO-3-fine-tuning',
      'k6-distributed-performance-benchmarks',
      'clickhouse-realtime-olap-aggregations',
    ],
    recommendedAgent: 'Cursor (.cursor)',
  },
  {
    id: 'multi-agent-swarms',
    name: 'Multi-Agent Swarm Orchestrator',
    badge: 'Autonomous Swarms',
    description: 'Hierarchical agent coordination, protocol bridging, and collaborative tool delegation.',
    skillSlugs: [
      'autogen-multi-agent-orchestrator',
      'crewai-task-delegation',
      'mcp-model-context-protocol',
      'langchain-agent-tools',
    ],
    recommendedAgent: 'Antigravity (.agent)',
  },
  {
    id: 'nextgen-frontend-ux',
    name: 'Next-Gen Frontend & Motion',
    badge: 'Fluid UX',
    description: 'Production physics-based micro-interactions, responsive design token architecture, and accessible components.',
    skillSlugs: [
      'framer-motion-magic',
      'motion-animation-patterns',
      'design-system-tokens',
      'web-accessibility-a11y',
    ],
    recommendedAgent: 'Universal (.agent)',
  },
  {
    id: 'cloud-native-resilience',
    name: 'Cloud-Native Microservices',
    badge: 'Cloud Native',
    description: 'Zero-downtime Kubernetes deployments, distributed in-memory caching, and hardened container isolation.',
    skillSlugs: [
      'kubernetes-helm-orchestrator',
      'docker-container-hardening',
      'aws-serverless-architect',
      'redis-distributed-caching',
    ],
    recommendedAgent: 'Cursor (.cursor)',
  },
  {
    id: 'automated-qa-testing',
    name: 'Autonomous QA & Test Engineering',
    badge: 'Zero Regressions',
    description: 'Comprehensive Playwright E2E browser automation, Vitest unit suites, and automated secret scanning.',
    skillSlugs: [
      'playwright-e2e-suite',
      'vitest-tdd-companion',
      'dependency-cve-auditor',
      'secret-leak-detector',
    ],
    recommendedAgent: 'Claude Code (.claude)',
  },
  {
    id: 'edge-serverless-fast',
    name: 'Ultra-Fast Edge & Serverless',
    badge: 'Sub-10ms Latency',
    description: 'Edge-computed workers, low-latency micro-APIs, high-speed Bun runtime, and monorepo build pipelines.',
    skillSlugs: [
      'cloudflare-workers-edge',
      'hono-ultrafast-edge-api',
      'bun-runtime-optimizer',
      'turborepo-monorepo-mastery',
    ],
    recommendedAgent: 'Universal (.agent)',
  },
];

