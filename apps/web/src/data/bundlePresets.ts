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
    description: 'Next.js 15 Turbopack server actions, type-safe Drizzle ORM relations, and ultra-fast edge APIs.',
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
];
