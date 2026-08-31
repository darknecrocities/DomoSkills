import { Category, Skill, SourceRepository } from '@domoskills/validators';

export const SEED_CATEGORIES: Category[] = [
  { id: 'cat-frontend', slug: 'frontend', name: 'Frontend', description: 'React, Next.js, Vue, Svelte, Tailwind, and client-side UI optimization', icon: 'Layout', order: 1 },
  { id: 'cat-design', slug: 'design', name: 'UI / UX / Design', description: 'Design systems, tokens, micro-interactions, motion, and accessibility', icon: 'Palette', order: 2 },
  { id: 'cat-backend', slug: 'backend', name: 'Backend', description: 'Node.js, FastAPI, Go, GraphQL, REST APIs, and microservices architecture', icon: 'Server', order: 3 },
  { id: 'cat-fullstack', slug: 'fullstack', name: 'Fullstack', description: 'End-to-end fullstack patterns, monorepos, and server-client state management', icon: 'Layers', order: 4 },
  { id: 'cat-security', slug: 'security', name: 'Security', description: 'OWASP standards, threat modeling, dependency auditing, and secrets hardening', icon: 'ShieldCheck', order: 5 },
  { id: 'cat-devops', slug: 'devops', name: 'DevOps', description: 'Docker containerization, Kubernetes, CI/CD pipelines, and infrastructure as code', icon: 'TerminalSquare', order: 6 },
  { id: 'cat-cloud', slug: 'cloud', name: 'Cloud', description: 'AWS, GCP, Azure, Terraform, serverless architecture, and observability', icon: 'Cloud', order: 7 },
  { id: 'cat-ai-ml', slug: 'ai-ml', name: 'AI / ML', description: 'RAG pipelines, LLM agent tool use, prompt evaluation, and vector retrieval', icon: 'Cpu', order: 8 },
  { id: 'cat-database', slug: 'database', name: 'Database', description: 'PostgreSQL, MySQL, Redis, index optimization, query tuning, and migrations', icon: 'Database', order: 9 },
  { id: 'cat-testing', slug: 'testing', name: 'Testing', description: 'Playwright E2E, Vitest unit testing, Cypress, and test-driven development', icon: 'CheckCircle2', order: 10 },
  { id: 'cat-mobile', slug: 'mobile', name: 'Mobile', description: 'React Native, Expo, Flutter, iOS Swift, and Android modern architectures', icon: 'Smartphone', order: 11 },
  { id: 'cat-productivity', slug: 'productivity', name: 'Productivity', description: 'Git workflows, automated documentation, changelogs, and developer toolchains', icon: 'Sparkles', order: 12 },
];

export const SEED_REPOSITORIES: Record<string, SourceRepository> = {
  'domoskills-official': {
    id: 'repo-domoskills-core',
    owner: 'domoskills',
    repository: 'official-agent-skills',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'Curated official core skills maintained by the DomoSkills open-source consortium',
    stars: 3420,
    verified: true,
    lastSyncedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-01-15T00:00:00.000Z',
  },
  'anthropic-community': {
    id: 'repo-anthropic-comm',
    owner: 'anthropic-community',
    repository: 'agent-skills-collection',
    sourceUrl: 'https://github.com/anthropic-community/agent-skills-collection',
    defaultBranch: 'main',
    license: 'Apache-2.0',
    description: 'Community-contributed skills and instructions for Claude Code and coding agents',
    stars: 5890,
    verified: true,
    lastSyncedAt: '2026-08-29T18:30:00.000Z',
    createdAt: '2025-03-10T00:00:00.000Z',
  },
  'opencode-lab': {
    id: 'repo-opencode-lab',
    owner: 'opencode-org',
    repository: 'agent-toolbelt',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'Extensible open-source skill plugins and prompt packages for AI code synthesis',
    stars: 4210,
    verified: true,
    lastSyncedAt: '2026-08-31T06:00:00.000Z',
    createdAt: '2025-02-20T00:00:00.000Z',
  },
  'security-first-ai': {
    id: 'repo-sec-ai',
    owner: 'security-guardians',
    repository: 'agent-security-skills',
    sourceUrl: 'https://github.com/security-guardians/agent-security-skills',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'OWASP and cybersecurity instruction sets and security linters for AI coding agents',
    stars: 2940,
    verified: true,
    lastSyncedAt: '2026-08-30T20:15:00.000Z',
    createdAt: '2025-04-05T00:00:00.000Z',
  },
  'infra-architects': {
    id: 'repo-infra-arch',
    owner: 'cloud-native-skills',
    repository: 'devops-agent-skills',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills',
    defaultBranch: 'main',
    license: 'Apache-2.0',
    description: 'Cloud infrastructure, Kubernetes, Docker and CI/CD blueprints for AI assistants',
    stars: 3180,
    verified: true,
    lastSyncedAt: '2026-08-28T14:40:00.000Z',
    createdAt: '2025-05-12T00:00:00.000Z',
  },
};

export const SEED_SKILLS: Skill[] = [
  // 1. FRONTEND - React Performance
  {
    id: 'skill-react-performance',
    slug: 'react-performance',
    name: 'React Performance',
    description: 'Optimize React applications for rendering speed, eliminates unnecessary re-renders, bundle splitting, and memoization guidelines.',
    category: 'frontend',
    tags: ['React', 'Performance', 'Memoization', 'Bundle-Size', 'Profiler'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/react-performance',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/react-performance',
    license: 'MIT',
    version: '1.4.2',
    commitSha: '7f9a12c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 14820,
    favorites: 2310,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2840, isExecutable: false },
      { path: 'references/rendering-checklist.md', type: 'file', size: 1420, isExecutable: false },
      { path: 'references/memo-patterns.md', type: 'file', size: 1980, isExecutable: false },
    ],
    instructions: `---
name: react-performance
description: Optimize React applications for rendering performance, bundle size, memoization, and component architecture.
license: MIT
version: 1.4.2
---

# React Performance Optimization Skill

When asked to audit, refactor, or build React applications for maximum performance, adhere to the following rules:

## 1. Eliminate Unnecessary Re-renders
- Never wrap every single primitive in \`useMemo\` or \`useCallback\` blindly. Profile first.
- Isolate frequently changing state into localized leaf components so parent component trees do not re-render.
- Prefer composition (e.g. passing JSX via \`children\`) over lifting state when the container does not depend on that state.

## 2. Context Partitioning
- Split fat Context into distinct Read and Write contexts to prevent consumer re-rendering when actions are triggered.
- For high-frequency state updates, replace React Context with Zustand, Jotai, or signal-based state.

## 3. Dynamic Imports & Code Splitting
- Lazy-load heavy dependencies (charts, markdown renderers, modal sheets) using \`React.lazy\` or \`next/dynamic\`.
- Keep the initial JS client bundle under 100KB gzipped.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
  },

  // 2. FRONTEND - Next.js App Router
  {
    id: 'skill-nextjs-app-router',
    slug: 'nextjs-app-router',
    name: 'Next.js App Router Architecture',
    description: 'Best practices for Server Components, Server Actions, route handlers, streaming SSR, and parallel route slots in Next.js.',
    category: 'frontend',
    tags: ['Next.js', 'React Server Components', 'Server Actions', 'SSR', 'Streaming'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/nextjs-app-router',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/nextjs-app-router',
    license: 'MIT',
    version: '2.1.0',
    commitSha: '8c4b91a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 19400,
    favorites: 3120,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false },
      { path: 'references/server-vs-client.md', type: 'file', size: 2200, isExecutable: false },
      { path: 'references/caching-matrix.md', type: 'file', size: 1750, isExecutable: false },
    ],
    instructions: `---
name: nextjs-app-router
description: Best practices for Server Components, Server Actions, route handlers, streaming SSR, and parallel route slots in Next.js.
license: MIT
version: 2.1.0
---

# Next.js App Router Architecture

## Server / Client Boundary Rules
1. **Default to React Server Components (RSC)**. Never add \`"use client"\` at the top of a file unless the component requires event handlers (\`onClick\`, \`onChange\`), browser APIs (\`localStorage\`, \`window\`), or React Hooks (\`useState\`, \`useEffect\`).
2. Push client boundaries as far down the component tree as possible.
3. Pass Server Components as children or props into Client Components to avoid unnecessary client bundling.

## Server Actions & Mutation
1. Always validate incoming parameters using Zod inside Server Actions before running database operations.
2. Authenticate the caller session inside the Server Action.
3. Use \`revalidatePath\` or \`revalidateTag\` to invalidate server cache deterministically.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-02-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },

  // 3. DESIGN - Design System Tokens
  {
    id: 'skill-design-system-tokens',
    slug: 'design-system-tokens',
    name: 'Design System & Token Architecture',
    description: 'Systematic color palette design, CSS variable semantic tokens, typographic scales, and dark-mode contract specifications.',
    category: 'design',
    tags: ['Design Systems', 'CSS Variables', 'Tokens', 'Dark Mode', 'Typography'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/design-system-tokens',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/design-system-tokens',
    license: 'MIT',
    version: '1.2.0',
    commitSha: '3e2d19f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 8920,
    favorites: 1450,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2400, isExecutable: false },
      { path: 'references/semantic-tokens.css', type: 'file', size: 1900, isExecutable: false },
    ],
    instructions: `---
name: design-system-tokens
description: Systematic color palette design, CSS variable semantic tokens, typographic scales, and dark-mode contract specifications.
license: MIT
version: 1.2.0
---

# Design System & Token Architecture

## Design Token Hierarchy
1. **Global/Primitive Tokens**: \`--color-gray-900: #141414\`, \`--font-size-base: 1rem\`
2. **Semantic Tokens**: \`--surface-primary: var(--color-gray-900)\`, \`--text-muted: var(--color-gray-400)\`
3. **Component Tokens**: \`--button-bg-hover: var(--surface-secondary)\`

Never use hardcoded hex values in component styling. Always reference semantic tokens.
`,
    lastIndexedAt: '2026-08-31T06:00:00.000Z',
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2026-08-20T00:00:00.000Z',
  },

  // 4. DESIGN - Motion & Micro-Interactions
  {
    id: 'skill-motion-animation-patterns',
    slug: 'motion-animation-patterns',
    name: 'Motion & Micro-Interactions',
    description: 'Smooth Framer Motion / Motion primitives, spring physics, layout animations, stagger transitions, and reduced-motion safety.',
    category: 'design',
    tags: ['Framer Motion', 'Micro-Interactions', 'Spring Physics', 'Accessibility', 'Layout'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/motion-animation-patterns',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/motion-animation-patterns',
    license: 'MIT',
    version: '1.1.5',
    commitSha: '5a1b94c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Verified',
    installs: 7340,
    favorites: 1220,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2600, isExecutable: false },
      { path: 'references/spring-presets.ts', type: 'file', size: 1400, isExecutable: false },
    ],
    instructions: `---
name: motion-animation-patterns
description: Smooth Framer Motion / Motion primitives, spring physics, layout animations, stagger transitions, and reduced-motion safety.
license: MIT
version: 1.1.5
---

# Motion & Animation Engineering

## Principles
1. **Purposeful Motion**: Every animation must communicate hierarchy, orientation, or state change.
2. **Spring Physics**: Use stiffness (300-400) and damping (25-35) for natural tactile feedback.
3. **Respect Reduced Motion**: Always wrap animated components with \`useReducedMotion()\` or CSS media queries.
`,
    lastIndexedAt: '2026-08-31T06:00:00.000Z',
    createdAt: '2025-04-10T00:00:00.000Z',
    updatedAt: '2026-08-15T00:00:00.000Z',
  },

  // 5. SECURITY - OWASP Agent Guardian
  {
    id: 'skill-owasp-agent-guardian',
    slug: 'owasp-agent-guardian',
    name: 'OWASP Top 10 Security Guardian',
    description: 'Enforce OWASP Top 10 guidelines, SQL injection prevention, SSRF defense, CSRF mitigation, input validation, and XSS sanitization.',
    category: 'security',
    tags: ['OWASP', 'Security', 'SQLi', 'XSS', 'SSRF', 'Sanitization'],
    sourceRepository: SEED_REPOSITORIES['security-first-ai'],
    sourcePath: 'skills/owasp-agent-guardian',
    sourceUrl: 'https://github.com/security-guardians/agent-security-skills/tree/main/skills/owasp-agent-guardian',
    license: 'MIT',
    version: '3.0.1',
    commitSha: '9e1a82b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 16750,
    favorites: 2890,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3800, isExecutable: false },
      { path: 'references/owasp-checklist.md', type: 'file', size: 2900, isExecutable: false },
      { path: 'references/headers-hardening.json', type: 'file', size: 950, isExecutable: false },
    ],
    instructions: `---
name: owasp-agent-guardian
description: Enforce OWASP Top 10 guidelines, SQL injection prevention, SSRF defense, CSRF mitigation, input validation, and XSS sanitization.
license: MIT
version: 3.0.1
---

# OWASP Security Guardian Skill

Whenever generating or reviewing backend, frontend, or database code:

1. **Input Validation**: Validate every external boundary with strict schema parsers (Zod/Pydantic). Do not rely on client-side validation.
2. **Parameterized Queries**: Never concatenate raw strings into SQL queries. Always use parameterized queries or type-safe ORMs.
3. **SSRF Guard**: When fetching external URLs provided by users, validate protocols (http/https only) and reject private/loopback IP ranges (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16, 169.254.169.254).
4. **Security Headers**: Always configure Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff, and X-Frame-Options: DENY.
`,
    lastIndexedAt: '2026-08-30T20:15:00.000Z',
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2026-08-29T00:00:00.000Z',
  },

  // 6. SECURITY - Secret Leak Detector
  {
    id: 'skill-secret-leak-detector',
    slug: 'secret-leak-detector',
    name: 'Secret Leak & Credential Auditor',
    description: 'Scan codebases and commits for accidental API tokens, RSA keys, AWS keys, JWT secrets, and environment variable misconfigurations.',
    category: 'security',
    tags: ['Secrets', 'Security Audit', 'API Keys', 'Credentials', 'Gitleaks'],
    sourceRepository: SEED_REPOSITORIES['security-first-ai'],
    sourcePath: 'skills/secret-leak-detector',
    sourceUrl: 'https://github.com/security-guardians/agent-security-skills/tree/main/skills/secret-leak-detector',
    license: 'MIT',
    version: '1.3.0',
    commitSha: '4c7d21a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 11200,
    favorites: 1820,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2700, isExecutable: false },
      { path: 'references/secret-patterns.json', type: 'file', size: 3200, isExecutable: false },
    ],
    instructions: `---
name: secret-leak-detector
description: Scan codebases and commits for accidental API tokens, RSA keys, AWS keys, JWT secrets, and environment variable misconfigurations.
license: MIT
version: 1.3.0
---

# Secret Leak Detection Guidelines

1. Never log or output secret keys, database connection strings containing passwords, or authorization tokens in console logs.
2. Flag any file committing \`.env\` or unencrypted private keys.
3. Enforce the use of environment variable managers (e.g. Infisical, Doppler, AWS Secrets Manager).
`,
    lastIndexedAt: '2026-08-30T20:15:00.000Z',
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2026-08-18T00:00:00.000Z',
  },

  // 7. BACKEND - FastAPI Clean Architecture
  {
    id: 'skill-fastapi-clean-architecture',
    slug: 'fastapi-clean-architecture',
    name: 'FastAPI Clean Architecture',
    description: 'Domain-driven design, asynchronous dependency injection, SQLAlchemy 2.0 async sessions, Pydantic v2 schemas, and JWT authentication.',
    category: 'backend',
    tags: ['Python', 'FastAPI', 'DDD', 'Async', 'SQLAlchemy', 'Pydantic'],
    sourceRepository: SEED_REPOSITORIES['anthropic-community'],
    sourcePath: 'skills/fastapi-clean-architecture',
    sourceUrl: 'https://github.com/anthropic-community/agent-skills-collection/tree/main/skills/fastapi-clean-architecture',
    license: 'Apache-2.0',
    version: '2.0.4',
    commitSha: '6b8a10e',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 12400,
    favorites: 2100,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3400, isExecutable: false },
      { path: 'references/domain-layers.md', type: 'file', size: 2100, isExecutable: false },
      { path: 'references/async-db-session.py', type: 'file', size: 1600, isExecutable: true },
    ],
    instructions: `---
name: fastapi-clean-architecture
description: Domain-driven design, asynchronous dependency injection, SQLAlchemy 2.0 async sessions, Pydantic v2 schemas, and JWT authentication.
license: Apache-2.0
version: 2.0.4
---

# FastAPI Clean Architecture Blueprint

## Architectural Layers
1. **Domain Models & Entities**: Pure Python dataclasses / Pydantic models with zero framework coupling.
2. **Repositories**: Interfaces for database persistence using SQLAlchemy async sessions.
3. **Use Cases / Services**: Business logic orchestrators.
4. **API Routers**: Thin HTTP controllers performing request parsing, dependency injection, and status code mapping.
`,
    lastIndexedAt: '2026-08-29T18:30:00.000Z',
    createdAt: '2025-02-14T00:00:00.000Z',
    updatedAt: '2026-08-27T00:00:00.000Z',
  },

  // 8. BACKEND - Node.js API Resilience
  {
    id: 'skill-nodejs-api-resilience',
    slug: 'nodejs-api-resilience',
    name: 'Node.js API Resilience & Reliability',
    description: 'Circuit breakers, exponential backoff retries, rate limiting, graceful shutdown handling, and structured JSON telemetry.',
    category: 'backend',
    tags: ['Node.js', 'Resilience', 'Circuit Breaker', 'Rate Limit', 'Telemetry', 'Express'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/nodejs-api-resilience',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/nodejs-api-resilience',
    license: 'MIT',
    version: '1.5.0',
    commitSha: '2d8f91b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 10300,
    favorites: 1640,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2900, isExecutable: false },
      { path: 'references/graceful-shutdown.ts', type: 'file', size: 1200, isExecutable: false },
    ],
    instructions: `---
name: nodejs-api-resilience
description: Circuit breakers, exponential backoff retries, rate limiting, graceful shutdown handling, and structured JSON telemetry.
license: MIT
version: 1.5.0
---

# Node.js API Resilience Standards

1. Handle \`SIGTERM\` and \`SIGINT\` signals gracefully, allowing existing connections to finish within a timeout window (e.g. 10s) before terminating the process.
2. Implement exponential jitter backoff for external HTTP and database calls.
3. Use a sliding window rate limiter (Redis-backed) for public endpoints.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-03-05T00:00:00.000Z',
    updatedAt: '2026-08-22T00:00:00.000Z',
  },

  // 9. FULLSTACK - Turborepo Monorepo Architecture
  {
    id: 'skill-monorepo-turbo-pattern',
    slug: 'monorepo-turbo-pattern',
    name: 'Turborepo Monorepo Engineering',
    description: 'High-speed Turborepo multi-package architectures, pnpm workspaces, shared UI packages, and shared TypeScript configurations.',
    category: 'fullstack',
    tags: ['Turborepo', 'Monorepo', 'pnpm', 'TypeScript', 'Workspaces'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/monorepo-turbo-pattern',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/monorepo-turbo-pattern',
    license: 'MIT',
    version: '2.0.1',
    commitSha: '1a9e34c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 13900,
    favorites: 2450,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false },
      { path: 'references/turbo-pipeline.json', type: 'file', size: 850, isExecutable: false },
    ],
    instructions: `---
name: monorepo-turbo-pattern
description: High-speed Turborepo multi-package architectures, pnpm workspaces, shared UI packages, and shared TypeScript configurations.
license: MIT
version: 2.0.1
---

# Monorepo Turborepo Architecture

1. Separate applications into \`apps/*\` and shared domain libraries into \`packages/*\`.
2. Use internal workspace packages with \`"workspace:*"\` references.
3. Configure \`turbo.json\` task dependencies with strict caching hash keys.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-02-18T00:00:00.000Z',
    updatedAt: '2026-08-24T00:00:00.000Z',
  },

  // 10. DEVOPS - Docker Container Hardening
  {
    id: 'skill-docker-container-hardening',
    slug: 'docker-container-hardening',
    name: 'Docker Container Hardening',
    description: 'Multi-stage Docker builds, non-root user execution, minimal distroless/Alpine base images, and vulnerability layer minimization.',
    category: 'devops',
    tags: ['Docker', 'Containers', 'Security', 'Alpine', 'Distroless', 'Multi-Stage'],
    sourceRepository: SEED_REPOSITORIES['infra-architects'],
    sourcePath: 'skills/docker-container-hardening',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills/tree/main/skills/docker-container-hardening',
    license: 'Apache-2.0',
    version: '1.6.0',
    commitSha: '5c2b78d',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 15300,
    favorites: 2670,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: true,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: ['scripts/audit-dockerfile.sh'],
      securityScore: 90,
      warnings: ['This skill contains an audit script (scripts/audit-dockerfile.sh). Review before executing.'],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3200, isExecutable: false },
      { path: 'references/hardened-node.Dockerfile', type: 'file', size: 1400, isExecutable: false },
      { path: 'scripts/audit-dockerfile.sh', type: 'file', size: 850, isExecutable: true },
    ],
    instructions: `---
name: docker-container-hardening
description: Multi-stage Docker builds, non-root user execution, minimal distroless/Alpine base images, and vulnerability layer minimization.
license: Apache-2.0
version: 1.6.0
---

# Docker Container Hardening Guidelines

1. Always use multi-stage builds to isolate compile-time tooling from runtime images.
2. Never run containers as root (\`USER 10001:10001\` or \`USER node\`).
3. Explicitly copy only production \`node_modules\` or compiled binaries into final images.
4. Use \`.dockerignore\` to prevent local \`.env\`, \`.git\`, or test files from entering image layers.
`,
    lastIndexedAt: '2026-08-28T14:40:00.000Z',
    createdAt: '2025-01-28T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z',
  },

  // 11. DEVOPS - GitHub Actions CI/CD
  {
    id: 'skill-github-actions-ci',
    slug: 'github-actions-ci',
    name: 'GitHub Actions Matrix CI/CD',
    description: 'Production CI pipelines, pnpm caching, parallel matrix testing, automated semver releases, and branch protection checks.',
    category: 'devops',
    tags: ['GitHub Actions', 'CI/CD', 'Automation', 'Matrix Testing', 'Caching'],
    sourceRepository: SEED_REPOSITORIES['infra-architects'],
    sourcePath: 'skills/github-actions-ci',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills/tree/main/skills/github-actions-ci',
    license: 'Apache-2.0',
    version: '1.4.1',
    commitSha: '9a3f81e',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 11800,
    favorites: 1910,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2800, isExecutable: false },
      { path: 'references/ci-workflow.yml', type: 'file', size: 1600, isExecutable: false },
    ],
    instructions: `---
name: github-actions-ci
description: Production CI pipelines, pnpm caching, parallel matrix testing, automated semver releases, and branch protection checks.
license: Apache-2.0
version: 1.4.1
---

# GitHub Actions CI Engineering

1. Pin all action versions to full commit SHAs for security against supply-chain attacks.
2. Enable build artifact and package manager cache keys to keep CI runtimes below 3 minutes.
3. Separate fast linting and type checking from integration test matrices.
`,
    lastIndexedAt: '2026-08-28T14:40:00.000Z',
    createdAt: '2025-02-11T00:00:00.000Z',
    updatedAt: '2026-08-21T00:00:00.000Z',
  },

  // 12. CLOUD - AWS Serverless Architecture
  {
    id: 'skill-aws-serverless-architect',
    slug: 'aws-serverless-architect',
    name: 'AWS Serverless Cloud Architect',
    description: 'Lambda cold-start optimization, DynamoDB single-table design, EventBridge choreography, SQS DLQs, and CDK / SST infrastructure.',
    category: 'cloud',
    tags: ['AWS', 'Serverless', 'Lambda', 'DynamoDB', 'EventBridge', 'CDK'],
    sourceRepository: SEED_REPOSITORIES['infra-architects'],
    sourcePath: 'skills/aws-serverless-architect',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills/tree/main/skills/aws-serverless-architect',
    license: 'Apache-2.0',
    version: '1.3.0',
    commitSha: '7b2e90f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 9450,
    favorites: 1530,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3400, isExecutable: false },
      { path: 'references/dynamodb-single-table.md', type: 'file', size: 2400, isExecutable: false },
    ],
    instructions: `---
name: aws-serverless-architect
description: Lambda cold-start optimization, DynamoDB single-table design, EventBridge choreography, SQS DLQs, and CDK / SST infrastructure.
license: Apache-2.0
version: 1.3.0
---

# AWS Serverless Cloud Blueprint

1. Keep Lambda packages lean by bundling with esbuild / rollup and tree-shaking AWS SDK v3 clients.
2. Initialize database connection clients outside handler functions to reuse sockets across warm invocations.
3. Implement Dead Letter Queues (DLQ) on all async event invocations.
`,
    lastIndexedAt: '2026-08-28T14:40:00.000Z',
    createdAt: '2025-03-22T00:00:00.000Z',
    updatedAt: '2026-08-23T00:00:00.000Z',
  },

  // 13. AI / ML - RAG Pipeline Architect
  {
    id: 'skill-rag-pipeline-architect',
    slug: 'rag-pipeline-architect',
    name: 'RAG Pipeline Architect',
    description: 'Vector chunking strategies, hybrid dense/sparse search (BM25 + vector), re-ranking models, context window compression, and citation grounding.',
    category: 'ai-ml',
    tags: ['RAG', 'Vector Search', 'Embeddings', 'Re-Ranking', 'Chunking', 'LLM'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/rag-pipeline-architect',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/rag-pipeline-architect',
    license: 'MIT',
    version: '2.2.0',
    commitSha: '4e8a71c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 18200,
    favorites: 3410,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3600, isExecutable: false },
      { path: 'references/chunking-comparison.md', type: 'file', size: 2100, isExecutable: false },
      { path: 'references/hybrid-search.py', type: 'file', size: 1700, isExecutable: true },
    ],
    instructions: `---
name: rag-pipeline-architect
description: Vector chunking strategies, hybrid dense/sparse search (BM25 + vector), re-ranking models, context window compression, and citation grounding.
license: MIT
version: 2.2.0
---

# RAG Pipeline Architecture Guide

## Chunking & Ingestion
1. Use semantic or recursive character chunking with 15-20% overlap.
2. Store rich metadata (source document, section header, date, permissions) alongside chunk vectors.

## Retrieval Optimization
1. Combine dense semantic embeddings with sparse keyword search (BM25) using Reciprocal Rank Fusion (RRF).
2. Pass top-K candidates (e.g. 25) through a cross-encoder re-ranking step (e.g. Cohere Rerank / BGE Reranker) before injecting the top 5 into the LLM prompt.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-01-05T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 14. AI / ML - Prompt Engineering & Eval
  {
    id: 'skill-prompt-engineering-eval',
    slug: 'prompt-engineering-eval',
    name: 'Prompt Engineering & Evaluation Suite',
    description: 'System prompt design, few-shot conditioning, structured XML tags, chain-of-thought elicitation, and automated LLM-as-a-judge eval harnesses.',
    category: 'ai-ml',
    tags: ['Prompt Engineering', 'Evaluation', 'Few-Shot', 'LLM-as-Judge', 'XML Tags'],
    sourceRepository: SEED_REPOSITORIES['anthropic-community'],
    sourcePath: 'skills/prompt-engineering-eval',
    sourceUrl: 'https://github.com/anthropic-community/agent-skills-collection/tree/main/skills/prompt-engineering-eval',
    license: 'Apache-2.0',
    version: '1.7.0',
    commitSha: '8d1e23a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 14100,
    favorites: 2520,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false },
      { path: 'references/prompt-templates.md', type: 'file', size: 2600, isExecutable: false },
    ],
    instructions: `---
name: prompt-engineering-eval
description: System prompt design, few-shot conditioning, structured XML tags, chain-of-thought elicitation, and automated LLM-as-a-judge eval harnesses.
license: Apache-2.0
version: 1.7.0
---

# Prompt Engineering & Evaluation Standards

1. Use structured XML markup (\`<instructions>\`, \`<examples>\`, \`<context>\`, \`<constraints>\`) to eliminate ambiguity.
2. Supply 2-3 high-quality few-shot examples showing desired edge-case handling.
3. Explicitly instruct models to "think silently in steps" before rendering final structured JSON/code output.
`,
    lastIndexedAt: '2026-08-29T18:30:00.000Z',
    createdAt: '2025-02-28T00:00:00.000Z',
    updatedAt: '2026-08-27T00:00:00.000Z',
  },

  // 15. DATABASE - PostgreSQL Query Optimizer
  {
    id: 'skill-postgres-query-optimizer',
    slug: 'postgres-query-optimizer',
    name: 'PostgreSQL Query Optimizer',
    description: 'EXPLAIN ANALYZE interpretation, B-tree vs GIN/BRIN indexes, partial indexes, CTE optimization, connection pooling with PgBouncer, and vacuum tuning.',
    category: 'database',
    tags: ['PostgreSQL', 'Index Tuning', 'EXPLAIN ANALYZE', 'PgBouncer', 'Query Optimization'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/postgres-query-optimizer',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/postgres-query-optimizer',
    license: 'MIT',
    version: '1.8.0',
    commitSha: '6c1f45b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 16100,
    favorites: 2980,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3500, isExecutable: false },
      { path: 'references/index-selector-flowchart.md', type: 'file', size: 1800, isExecutable: false },
      { path: 'references/explain-analyze-patterns.sql', type: 'file', size: 2200, isExecutable: false },
    ],
    instructions: `---
name: postgres-query-optimizer
description: EXPLAIN ANALYZE interpretation, B-tree vs GIN/BRIN indexes, partial indexes, CTE optimization, connection pooling with PgBouncer, and vacuum tuning.
license: MIT
version: 1.8.0
---

# PostgreSQL Optimization Skill

## EXPLAIN ANALYZE Inspection
1. Look for \`Seq Scan\` on tables with > 10,000 rows. Add composite or partial indexes.
2. Check for memory spilling in \`Sort Method: external merge Disk\`. Tune \`work_mem\` or optimize \`ORDER BY\` clauses.
3. Use partial indexes (\`WHERE status = 'pending'\`) for hot active rows.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-01-18T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },

  // 16. DATABASE - Database Migration Guard
  {
    id: 'skill-database-migration-guard',
    slug: 'database-migration-guard',
    name: 'Database Migration Zero-Downtime Guard',
    description: 'Zero-downtime schema evolution, expand/contract patterns, safe column drops, lock-safe index creation (CONCURRENTLY), and rollback safety.',
    category: 'database',
    tags: ['Database Migrations', 'Zero Downtime', 'Schema', 'PostgreSQL', 'Prisma', 'Drizzle'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/database-migration-guard',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/database-migration-guard',
    license: 'MIT',
    version: '1.2.1',
    commitSha: '3a8f12c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 8640,
    favorites: 1390,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2800, isExecutable: false },
      { path: 'references/expand-contract.md', type: 'file', size: 1950, isExecutable: false },
    ],
    instructions: `---
name: database-migration-guard
description: Zero-downtime schema evolution, expand/contract patterns, safe column drops, lock-safe index creation (CONCURRENTLY), and rollback safety.
license: MIT
version: 1.2.1
---

# Zero-Downtime Migration Rules

1. **Never add NOT NULL column without a DEFAULT in a single step** on existing production tables.
2. Always create indexes with \`CREATE INDEX CONCURRENTLY\` to prevent full table exclusive locks.
3. Use the Expand-and-Contract (Parallel Run) migration pattern for renaming or restructuring tables.
`,
    lastIndexedAt: '2026-08-31T06:00:00.000Z',
    createdAt: '2025-04-02T00:00:00.000Z',
    updatedAt: '2026-08-19T00:00:00.000Z',
  },

  // 17. TESTING - Playwright E2E Suite
  {
    id: 'skill-playwright-e2e-suite',
    slug: 'playwright-e2e-suite',
    name: 'Playwright E2E Test Suite',
    description: 'Resilient end-to-end testing, page object model (POM), network mocking, visual regression snapshots, authentication state caching, and CI parallelism.',
    category: 'testing',
    tags: ['Playwright', 'E2E Testing', 'Page Object Model', 'Visual Regression', 'Auth State'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/playwright-e2e-suite',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/playwright-e2e-suite',
    license: 'MIT',
    version: '1.9.0',
    commitSha: '9b2c83d',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 14200,
    favorites: 2490,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3300, isExecutable: false },
      { path: 'references/page-object-template.ts', type: 'file', size: 1600, isExecutable: false },
      { path: 'references/auth-setup.ts', type: 'file', size: 1100, isExecutable: false },
    ],
    instructions: `---
name: playwright-e2e-suite
description: Resilient end-to-end testing, page object model (POM), network mocking, visual regression snapshots, authentication state caching, and CI parallelism.
license: MIT
version: 1.9.0
---

# Playwright E2E Best Practices

1. Use user-facing locators (\`page.getByRole\`, \`page.getByText\`, \`page.getByLabel\`) rather than fragile CSS or XPath selectors.
2. Cache authentication storage state in \`playwright/.auth/user.json\` so tests do not redundantly re-login.
3. Structure complex tests using the Page Object Model (POM).
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-01-22T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
  },

  // 18. TESTING - Vitest TDD Companion
  {
    id: 'skill-vitest-tdd-companion',
    slug: 'vitest-tdd-companion',
    name: 'Vitest Unit & Integration Companion',
    description: 'Fast ESM unit testing, test-driven development (TDD) workflows, mock factories, code coverage thresholds, and snapshot assertions.',
    category: 'testing',
    tags: ['Vitest', 'TDD', 'Unit Testing', 'Mocks', 'Coverage', 'TypeScript'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/vitest-tdd-companion',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/vitest-tdd-companion',
    license: 'MIT',
    version: '1.4.0',
    commitSha: '5f1e84a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 10900,
    favorites: 1810,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2700, isExecutable: false },
      { path: 'references/mock-factory.ts', type: 'file', size: 1300, isExecutable: false },
    ],
    instructions: `---
name: vitest-tdd-companion
description: Fast ESM unit testing, test-driven development (TDD) workflows, mock factories, code coverage thresholds, and snapshot assertions.
license: MIT
version: 1.4.0
---

# Vitest TDD Companion

1. Write minimal failing tests before implementing logic (Red -> Green -> Refactor).
2. Keep unit tests isolated and deterministic without network dependencies.
3. Use \`vi.mock\` and \`vi.spyOn\` cleanly with automatic cleanup via \`afterEach(() => vi.clearAllMocks())\`.
`,
    lastIndexedAt: '2026-08-31T06:00:00.000Z',
    createdAt: '2025-03-08T00:00:00.000Z',
    updatedAt: '2026-08-20T00:00:00.000Z',
  },

  // 19. MOBILE - React Native Expo Performance
  {
    id: 'skill-react-native-expo-perf',
    slug: 'react-native-expo-perf',
    name: 'React Native & Expo Mobile Optimization',
    description: 'FlashList virtualized list rendering, Reanimated 3 worklets, Skia graphics, offline caching with MMKV, and deep linking architectures.',
    category: 'mobile',
    tags: ['React Native', 'Expo', 'FlashList', 'Reanimated', 'MMKV', 'Mobile'],
    sourceRepository: SEED_REPOSITORIES['anthropic-community'],
    sourcePath: 'skills/react-native-expo-perf',
    sourceUrl: 'https://github.com/anthropic-community/agent-skills-collection/tree/main/skills/react-native-expo-perf',
    license: 'Apache-2.0',
    version: '1.3.2',
    commitSha: '8c2a90b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 8100,
    favorites: 1340,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3000, isExecutable: false },
      { path: 'references/worklet-patterns.ts', type: 'file', size: 1500, isExecutable: false },
    ],
    instructions: `---
name: react-native-expo-perf
description: FlashList virtualized list rendering, Reanimated 3 worklets, Skia graphics, offline caching with MMKV, and deep linking architectures.
license: Apache-2.0
version: 1.3.2
---

# React Native & Expo Performance Blueprint

1. Replace legacy \`FlatList\` with \`@shopify/flash-list\` for 60fps scrolling on large datasets.
2. Run complex gestures and animations directly on the UI thread using Reanimated 3 worklets.
3. Use MMKV or SQLite for synchronous, lightning-fast key-value persistence.
`,
    lastIndexedAt: '2026-08-29T18:30:00.000Z',
    createdAt: '2025-04-14T00:00:00.000Z',
    updatedAt: '2026-08-24T00:00:00.000Z',
  },

  // 20. PRODUCTIVITY - Git Workflow & PR Automator
  {
    id: 'skill-git-workflow-automator',
    slug: 'git-workflow-automator',
    name: 'Git Workflow & Conventional Commits',
    description: 'Conventional commits standard (feat, fix, chore), semantic release automation, rebase workflows, and clean pull request templates.',
    category: 'productivity',
    tags: ['Git', 'Conventional Commits', 'Semantic Release', 'Pull Requests', 'Productivity'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/git-workflow-automator',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/git-workflow-automator',
    license: 'MIT',
    version: '1.1.0',
    commitSha: '2f4e91a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 9200,
    favorites: 1480,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2500, isExecutable: false },
      { path: 'references/commitlint-config.js', type: 'file', size: 800, isExecutable: false },
    ],
    instructions: `---
name: git-workflow-automator
description: Conventional commits standard (feat, fix, chore), semantic release automation, rebase workflows, and clean pull request templates.
license: MIT
version: 1.1.0
---

# Git Workflow & Conventional Commits

1. Structure commit messages as \`<type>(<optional scope>): <description>\`.
2. Keep pull requests focused and atomic (under 300 lines of change).
3. Rebase onto the target branch before merging to maintain clean linear history.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-05-01T00:00:00.000Z',
    updatedAt: '2026-08-22T00:00:00.000Z',
  },

  // 21. FRONTEND - Web Accessibility (a11y)
  {
    id: 'skill-web-accessibility-a11y',
    slug: 'web-accessibility-a11y',
    name: 'Web Accessibility & WCAG 2.2 Guardian',
    description: 'WCAG 2.2 AA compliance, ARIA landmarks, keyboard focus traps, screen reader announcements, color contrast, and automated axe-core audits.',
    category: 'frontend',
    tags: ['Accessibility', 'a11y', 'WCAG', 'ARIA', 'Screen Reader', 'Keyboard Nav'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/web-accessibility-a11y',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/web-accessibility-a11y',
    license: 'MIT',
    version: '1.2.4',
    commitSha: '6d9e12f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 11400,
    favorites: 1930,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false },
      { path: 'references/aria-matrix.md', type: 'file', size: 2100, isExecutable: false },
    ],
    instructions: `---
name: web-accessibility-a11y
description: WCAG 2.2 AA compliance, ARIA landmarks, keyboard focus traps, screen reader announcements, color contrast, and automated axe-core audits.
license: MIT
version: 1.2.4
---

# Web Accessibility Engineering

1. Use semantic HTML5 tags (\`<main>\`, \`<nav>\`, \`<header>\`, \`<article>\`, \`<button>\`) before applying ARIA roles.
2. Ensure interactive elements are keyboard focusable with visible focus rings.
3. Maintain minimum 4.5:1 color contrast ratio for normal text and 3:1 for large text.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-02-15T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z',
  },

  // 22. SECURITY - Dependency CVE Auditor
  {
    id: 'skill-dependency-cve-auditor',
    slug: 'dependency-cve-auditor',
    name: 'Dependency CVE & Supply-Chain Auditor',
    description: 'Inspect package lockfiles for known vulnerabilities, typosquatting packages, license incompatibilities, and malicious install scripts.',
    category: 'security',
    tags: ['CVE', 'Supply Chain', 'Dependencies', 'npm audit', 'Security'],
    sourceRepository: SEED_REPOSITORIES['security-first-ai'],
    sourcePath: 'skills/dependency-cve-auditor',
    sourceUrl: 'https://github.com/security-guardians/agent-security-skills/tree/main/skills/dependency-cve-auditor',
    license: 'MIT',
    version: '1.2.0',
    commitSha: '3c1d90a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 9800,
    favorites: 1610,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [
      { path: 'SKILL.md', type: 'file', size: 2700, isExecutable: false },
      { path: 'references/license-allowlist.json', type: 'file', size: 900, isExecutable: false },
    ],
    instructions: `---
name: dependency-cve-auditor
description: Inspect package lockfiles for known vulnerabilities, typosquatting packages, license incompatibilities, and malicious install scripts.
license: MIT
version: 1.2.0
---

# Dependency Security Guidelines

1. Disable \`scripts.postinstall\` execution for untrusted dependencies in \`.npmrc\` or \`pnpm-workspace.yaml\`.
2. Run automated lockfile validation in CI pipelines.
3. Reject dependencies without explicit OSI-approved open-source licenses.
`,
    lastIndexedAt: '2026-08-30T20:15:00.000Z',
    createdAt: '2025-03-12T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
  },

  // 23. DATABASE - Supabase RLS Architect
  {
    id: 'skill-supabase-rls-architect',
    slug: 'supabase-rls-architect',
    name: 'Supabase Row-Level Security Architect',
    description: 'PostgreSQL Row Level Security (RLS) policies, JWT claims validation, role-based access control (RBAC), and multi-tenant isolation.',
    category: 'database',
    tags: ['Supabase', 'PostgreSQL', 'RLS', 'Security', 'Multi-tenant'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/supabase-rls-architect',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/supabase-rls-architect',
    license: 'MIT',
    version: '2.1.0',
    commitSha: '8d2a19e',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 14200,
    favorites: 2890,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false }],
    instructions: `---
name: supabase-rls-architect
description: PostgreSQL Row Level Security (RLS) policies, JWT claims validation, role-based access control (RBAC), and multi-tenant isolation.
license: MIT
version: 2.1.0
---

# Supabase Row-Level Security Rules

1. Always enable RLS on every table (\`ALTER TABLE my_table ENABLE ROW LEVEL SECURITY\`).
2. Validate \`auth.uid()\` on all SELECT, INSERT, UPDATE, and DELETE policies.
3. Optimize policy subqueries with index-backed foreign key lookups.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-04-10T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },

  // 24. DATABASE - Drizzle ORM Master
  {
    id: 'skill-drizzle-orm-master',
    slug: 'drizzle-orm-master',
    name: 'Drizzle ORM Master',
    description: 'Type-safe SQL schemas, zero-overhead relational queries, automated migrations with Drizzle Kit, and PostgreSQL connection pooling.',
    category: 'database',
    tags: ['Drizzle', 'ORM', 'TypeScript', 'SQL', 'PostgreSQL'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/drizzle-orm-master',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/drizzle-orm-master',
    license: 'MIT',
    version: '1.5.0',
    commitSha: '6c3f12a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 16800,
    favorites: 3120,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 2800, isExecutable: false }],
    instructions: `---
name: drizzle-orm-master
description: Type-safe SQL schemas, zero-overhead relational queries, automated migrations with Drizzle Kit, and PostgreSQL connection pooling.
license: MIT
version: 1.5.0
---

# Drizzle ORM Best Practices

1. Declare modular schemas in \`src/db/schema/\` grouped by domain entity.
2. Use \`db.query.<table\>.findMany\` for nested relational joins without manual join boilerplate.
3. Generate type-safe migrations with \`drizzle-kit generate:pg\`.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-05-01T00:00:00.000Z',
    updatedAt: '2026-08-29T00:00:00.000Z',
  },

  // 25. AI/ML - LangChain Agent Tools
  {
    id: 'skill-langchain-agent-tools',
    slug: 'langchain-agent-tools',
    name: 'LangChain & LangGraph Tool Synthesizer',
    description: 'Dynamic tool definition schemas, LangGraph stateful multi-agent supervisor loops, human-in-the-loop checkpointing, and LangSmith tracing.',
    category: 'ai-ml',
    tags: ['LangChain', 'LangGraph', 'Agent Tools', 'StateGraph', 'Python'],
    sourceRepository: SEED_REPOSITORIES['anthropic-community'],
    sourcePath: 'skills/langchain-agent-tools',
    sourceUrl: 'https://github.com/anthropic-community/agent-skills-collection/tree/main/skills/langchain-agent-tools',
    license: 'Apache-2.0',
    version: '2.0.4',
    commitSha: '9e4a21f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Community',
    installs: 19400,
    favorites: 4200,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: true,
      requiresExternalDependencies: true,
      executableFiles: [],
      securityScore: 95,
      warnings: ['Requires external LLM API key'],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 3400, isExecutable: false }],
    instructions: `---
name: langchain-agent-tools
description: Dynamic tool definition schemas, LangGraph stateful multi-agent supervisor loops, human-in-the-loop checkpointing, and LangSmith tracing.
license: Apache-2.0
version: 2.0.4
---

# LangGraph Agent Orchestration

1. Use \`StateGraph\` to model explicit state transitions between researcher, writer, and validator subagents.
2. Annotate tool parameters with Pydantic / Zod schemas for unambiguous JSON validation.
3. Configure persistent memory stores (\`SqliteSaver\` / \`PostgresSaver\`) for interruptible workflows.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-05-15T00:00:00.000Z',
    updatedAt: '2026-08-27T00:00:00.000Z',
  },

  // 26. AI/ML - Ollama Local LLM Bridge
  {
    id: 'skill-ollama-local-llm-bridge',
    slug: 'ollama-local-llm-bridge',
    name: 'Ollama Local LLM Bridge',
    description: 'Run offline LLMs (Llama 3, Mistral, Qwen, DeepSeek) locally with zero cloud API costs, structured JSON outputs, and high-speed streaming.',
    category: 'ai-ml',
    tags: ['Ollama', 'Local LLM', 'Llama3', 'DeepSeek', 'Privacy'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/ollama-local-llm-bridge',
    sourceUrl: 'https://github.com/opencode-org/agent-toolbelt/tree/main/skills/ollama-local-llm-bridge',
    license: 'MIT',
    version: '1.3.1',
    commitSha: '5a2b88c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 22100,
    favorites: 4800,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 2600, isExecutable: false }],
    instructions: `---
name: ollama-local-llm-bridge
description: Run offline LLMs (Llama 3, Mistral, Qwen, DeepSeek) locally with zero cloud API costs, structured JSON outputs, and high-speed streaming.
license: MIT
version: 1.3.1
---

# Local LLM Integration Guidelines

1. Connect to \`http://localhost:11434/api/generate\` with keep-alive connections.
2. Request structured outputs via \`format: "json"\` schema parameter.
3. Stream responses with ReadableStream chunks to prevent UI blocking.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 27. CLOUD - Cloudflare Workers Edge
  {
    id: 'skill-cloudflare-workers-edge',
    slug: 'cloudflare-workers-edge',
    name: 'Cloudflare Workers Edge Architecture',
    description: 'Serverless edge compute, KV stores, D1 SQL databases, Vectorize embeddings, Durable Objects for WebSockets, and Wrangler deployment.',
    category: 'cloud',
    tags: ['Cloudflare', 'Edge', 'Workers', 'D1', 'Vectorize', 'Serverless'],
    sourceRepository: SEED_REPOSITORIES['infra-architects'],
    sourcePath: 'skills/cloudflare-workers-edge',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills/tree/main/skills/cloudflare-workers-edge',
    license: 'Apache-2.0',
    version: '1.4.0',
    commitSha: '2d9f44a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 15300,
    favorites: 2980,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 2950, isExecutable: false }],
    instructions: `---
name: cloudflare-workers-edge
description: Serverless edge compute, KV stores, D1 SQL databases, Vectorize embeddings, Durable Objects for WebSockets, and Wrangler deployment.
license: Apache-2.0
version: 1.4.0
---

# Cloudflare Workers Edge Standards

1. Use ES module syntax with \`export default { async fetch(req, env, ctx) }\`.
2. Keep cold start latency under 5ms by avoiding heavy polyfills.
3. Cache static assets and API responses using Cloudflare Cache API (\`caches.default\`).
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-06-10T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },

  // 28. BACKEND - Bun Runtime Optimizer
  {
    id: 'skill-bun-runtime-optimizer',
    slug: 'bun-runtime-optimizer',
    name: 'Bun Runtime & Fast HTTP Server',
    description: 'High-throughput HTTP microservices with Bun.serve(), native SQLite, file I/O acceleration, and zero-transpiler TypeScript execution.',
    category: 'backend',
    tags: ['Bun', 'TypeScript', 'Performance', 'SQLite', 'HTTP'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/bun-runtime-optimizer',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/bun-runtime-optimizer',
    license: 'MIT',
    version: '1.2.0',
    commitSha: '4b1e77d',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 13200,
    favorites: 2450,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 2400, isExecutable: false }],
    instructions: `---
name: bun-runtime-optimizer
description: High-throughput HTTP microservices with Bun.serve(), native SQLite, file I/O acceleration, and zero-transpiler TypeScript execution.
license: MIT
version: 1.2.0
---

# Bun Performance Guidelines

1. Use \`Bun.serve()\` instead of Express for 4x higher request throughput.
2. Utilize native \`bun:sqlite\` for lightning-fast embedded database reads.
3. Leverage \`Bun.file()\` for zero-copy streaming static assets.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-06-20T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
  },

  // 29. DESIGN - Framer Motion Magic
  {
    id: 'skill-framer-motion-magic',
    slug: 'framer-motion-magic',
    name: 'Framer Motion Magic & Micro-interactions',
    description: 'Physics-based spring animations, layout animations (\`layoutId\`), scroll parallax transforms, magnetic cursors, and page transitions.',
    category: 'design',
    tags: ['Framer Motion', 'Animation', 'Spring', 'UI/UX', 'Micro-interactions'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/framer-motion-magic',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/framer-motion-magic',
    license: 'MIT',
    version: '1.6.0',
    commitSha: '8c9a33e',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 27500,
    favorites: 5900,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 3300, isExecutable: false }],
    instructions: `---
name: framer-motion-magic
description: Physics-based spring animations, layout animations (layoutId), scroll parallax transforms, magnetic cursors, and page transitions.
license: MIT
version: 1.6.0
---

# Framer Motion Principles

1. Prefer spring physics (\`type: "spring", stiffness: 300, damping: 25\`) over linear durations for natural feel.
2. Use \`AnimatePresence mode="wait"\` for smooth route and modal exit animations.
3. Always include \`useReducedMotion()\` checks for accessibility compliance.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-07-01T00:00:00.000Z',
    updatedAt: '2026-08-29T00:00:00.000Z',
  },

  // 30. DEVOPS - Kubernetes Helm Orchestrator
  {
    id: 'skill-kubernetes-helm-orchestrator',
    slug: 'kubernetes-helm-orchestrator',
    name: 'Kubernetes Helm Chart Orchestrator',
    description: 'Production-ready Helm charts, ingress controllers, Horizontal Pod Autoscalers (HPA), zero-downtime rolling deploys, and secret mounts.',
    category: 'devops',
    tags: ['Kubernetes', 'Helm', 'K8s', 'DevOps', 'Autoscaling'],
    sourceRepository: SEED_REPOSITORIES['infra-architects'],
    sourcePath: 'skills/kubernetes-helm-orchestrator',
    sourceUrl: 'https://github.com/cloud-native-skills/devops-agent-skills/tree/main/skills/kubernetes-helm-orchestrator',
    license: 'Apache-2.0',
    version: '2.0.1',
    commitSha: '1a9e66b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Verified',
    installs: 18100,
    favorites: 3400,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 3100, isExecutable: false }],
    instructions: `---
name: kubernetes-helm-orchestrator
description: Production-ready Helm charts, ingress controllers, Horizontal Pod Autoscalers (HPA), zero-downtime rolling deploys, and secret mounts.
license: Apache-2.0
version: 2.0.1
---

# Kubernetes Production Standards

1. Always define explicit \`resources.requests\` and \`resources.limits\` on container specs.
2. Configure \`readinessProbe\` and \`livenessProbe\` endpoints with proper initial delays.
3. Manage secrets with SealedSecrets or ExternalSecrets operator instead of plaintext configmaps.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-07-10T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },

  // 31. PRODUCTIVITY - System Architecture C4 Model
  {
    id: 'skill-system-architecture-c4',
    slug: 'system-architecture-c4',
    name: 'C4 System Architecture & Mermaid Blueprints',
    description: 'System context, container, component, and code level architecture diagrams with Mermaid.js and Structurizr specification.',
    category: 'productivity',
    tags: ['Architecture', 'C4 Model', 'Mermaid', 'Documentation', 'System Design'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/system-architecture-c4',
    sourceUrl: 'https://github.com/domoskills/official-agent-skills/tree/main/skills/system-architecture-c4',
    license: 'MIT',
    version: '1.1.0',
    commitSha: '7b2a99c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 14700,
    favorites: 2900,
    isVerified: true,
    isFeatured: true,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: false,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 2800, isExecutable: false }],
    instructions: `---
name: system-architecture-c4
description: System context, container, component, and code level architecture diagrams with Mermaid.js and Structurizr specification.
license: MIT
version: 1.1.0
---

# C4 Architecture Blueprint Rules

1. Level 1 (Context): Show human actors, external services, and organizational boundaries.
2. Level 2 (Container): Map applications, databases, message queues, and communication protocols.
3. Level 3 (Component): Detail modules, controllers, and services within a container.
`,
    lastIndexedAt: '2026-08-30T12:00:00.000Z',
    createdAt: '2025-07-20T00:00:00.000Z',
    updatedAt: '2026-08-26T00:00:00.000Z',
  },
];

