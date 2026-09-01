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
  'mengto-skills': {
    id: 'repo-mengto-skills',
    owner: 'MengTo',
    repository: 'Skills',
    sourceUrl: 'https://github.com/MengTo/Skills',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'Agent skills for designers and builders using Claude Code, Cursor, Codex, and modern AI coding agents',
    stars: 1250,
    verified: true,
    lastSyncedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-01-10T00:00:00.000Z',
  },
  'uupm-pro-max': {
    id: 'repo-uupm-pro-max',
    owner: 'nextlevelbuilder',
    repository: 'ui-ux-pro-max-skill',
    sourceUrl: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'AI-powered design intelligence toolkit with 57 UI styles, 95 color palettes, 56 font pairings, and 29 landing patterns (uupm.cc)',
    stars: 123620,
    verified: true,
    lastSyncedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2024-11-15T00:00:00.000Z',
  },
  'typeui-org': {
    id: 'repo-typeui',
    owner: 'bergside',
    repository: 'typeui',
    sourceUrl: 'https://github.com/bergside/typeui',
    defaultBranch: 'main',
    license: 'MIT',
    description: 'Systematic UI component extraction, DESIGN.md generation, and typography engineering for AI agents (typeui.sh)',
    stars: 4320,
    verified: true,
    lastSyncedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-02-10T00:00:00.000Z',
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
    previewImage: '/skill-previews/typography-system.jpg',
    prompt: 'Generate a comprehensive design token architecture system with systematic color palettes, typographic scales, and semantic dark-mode contracts in CSS and Tailwind.',
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
    previewImage: '/skill-previews/animation-motion.jpg',
    prompt: 'Implement production-grade micro-interactions, hardware-accelerated spring animations, and accessible motion reduction patterns with Framer Motion.',
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

  // 32. AI/ML - Vercel AI SDK Core Mastery
  {
    id: 'skill-vercel-ai-sdk-mastery',
    slug: 'vercel-ai-sdk-mastery',
    name: 'Vercel AI SDK Core & Generative UI',
    description: 'Streaming text, multi-modal tool calling, object generation with Zod, and Generative UI components using the Vercel AI SDK.',
    category: 'ai-ml',
    tags: ['AI-SDK', 'Streaming', 'Generative-UI', 'Zod', 'Tool-Calling', 'Next.js'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/vercel-ai-sdk-mastery',
    sourceUrl: 'https://github.com/vercel/ai',
    license: 'Apache-2.0',
    version: '3.4.0',
    commitSha: '9a1e44f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 48900,
    favorites: 9320,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 3400, isExecutable: false }],
    instructions: `---
name: vercel-ai-sdk-mastery
description: Streaming text, multi-modal tool calling, object generation with Zod, and Generative UI components using the Vercel AI SDK.
license: Apache-2.0
version: 3.4.0
---

# Vercel AI SDK Guidelines

1. Use \`streamText\` with \`toDataStreamResponse()\` for standard LLM streams.
2. Define typed tool schemas with Zod and handle execution promises cleanly.
3. Use \`generateObject\` for structured JSON outputs with schema enforcement.
4. Render streamed UI with \`useChat\` and \`useCompletion\` hooks.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-01T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 33. AI/ML - Model Context Protocol (MCP) Bridge
  {
    id: 'skill-mcp-model-context-protocol',
    slug: 'mcp-model-context-protocol',
    name: 'Model Context Protocol (MCP) Server Bridge',
    description: 'Implement standardized Model Context Protocol (MCP) tool servers, resources, prompts, and JSON-RPC transport bridges.',
    category: 'ai-ml',
    tags: ['MCP', 'Anthropic', 'JSON-RPC', 'Protocol', 'Tool-Use', 'Standards'],
    sourceRepository: SEED_REPOSITORIES['anthropic-community'],
    sourcePath: 'skills/mcp-model-context-protocol',
    sourceUrl: 'https://github.com/modelcontextprotocol/servers',
    license: 'MIT',
    version: '1.2.0',
    commitSha: '6c8f12d',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Verified',
    installs: 36400,
    favorites: 7120,
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
name: mcp-model-context-protocol
description: Implement standardized Model Context Protocol (MCP) tool servers, resources, prompts, and JSON-RPC transport bridges.
license: MIT
version: 1.2.0
---

# Model Context Protocol Rules

1. Define resources with URI templates: \`file:///\`, \`postgres:///\`, \`github:///\`.
2. Expose tools with explicit JSON Schema parameters and structured return payloads.
3. Support Stdio and SSE transports for client connections.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-05T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // 34. AI/ML - AutoGen Multi-Agent Orchestrator
  {
    id: 'skill-autogen-multi-agent-orchestrator',
    slug: 'autogen-multi-agent-orchestrator',
    name: 'AutoGen Multi-Agent Conversational Workflows',
    description: 'Design multi-agent group chats, role-based handoffs, code execution sandboxes, and round-robin agent coordination.',
    category: 'ai-ml',
    tags: ['AutoGen', 'Multi-Agent', 'GroupChat', 'Coordination', 'Python'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/autogen-multi-agent-orchestrator',
    sourceUrl: 'https://github.com/microsoft/autogen',
    license: 'MIT',
    version: '2.1.0',
    commitSha: '5e7a33b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Community',
    installs: 29800,
    favorites: 5410,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 2900, isExecutable: false }],
    instructions: `---
name: autogen-multi-agent-orchestrator
description: Design multi-agent group chats, role-based handoffs, code execution sandboxes, and round-robin agent coordination.
license: MIT
version: 2.1.0
---

# AutoGen Architecture Guidelines

1. Define clear agent roles: AssistantAgent (planner), UserProxyAgent (executor), CriticAgent (reviewer).
2. Set termination conditions with \`is_termination_msg\` to prevent infinite loops.
3. Sandbox external code execution inside Docker container environments.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-10T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 35. AI/ML - CrewAI Task Delegation
  {
    id: 'skill-crewai-task-delegation',
    slug: 'crewai-task-delegation',
    name: 'CrewAI Autonomous Role Playing & Task Delegation',
    description: 'Hierarchical and sequential agent crews with role assignment, goal definitions, tool delegation, and memory caches.',
    category: 'ai-ml',
    tags: ['CrewAI', 'Agents', 'Autonomous', 'Delegation', 'Memory'],
    sourceRepository: SEED_REPOSITORIES['opencode-lab'],
    sourcePath: 'skills/crewai-task-delegation',
    sourceUrl: 'https://github.com/crewAIInc/crewAI',
    license: 'MIT',
    version: '1.4.0',
    commitSha: '8d2a19f',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Community',
    installs: 27500,
    favorites: 4890,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 2800, isExecutable: false }],
    instructions: `---
name: crewai-task-delegation
description: Hierarchical and sequential agent crews with role assignment, goal definitions, tool delegation, and memory caches.
license: MIT
version: 1.4.0
---

# CrewAI Agent Orchestration

1. Explicitly specify Agent \`role\`, \`goal\`, and \`backstory\` to constrain behavior.
2. Use \`Process.hierarchical\` when a manager agent must delegate tasks dynamically.
3. Configure \`memory=True\` for short-term and entity contextual persistence.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-12T00:00:00.000Z',
    updatedAt: '2026-08-29T00:00:00.000Z',
  },

  // 36. DATABASE - GraphRAG Knowledge Explorer
  {
    id: 'skill-graphrag-knowledge-explorer',
    slug: 'graphrag-knowledge-explorer',
    name: 'GraphRAG & Knowledge Graph Augmented Retrieval',
    description: 'Build hybrid vector and knowledge graph retrieval pipelines using Neo4j, LangChain GraphIndex, and community clustering.',
    category: 'database',
    tags: ['GraphRAG', 'Neo4j', 'Knowledge-Graph', 'Vector-Search', 'Hybrid-Search'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/graphrag-knowledge-explorer',
    sourceUrl: 'https://github.com/microsoft/graphrag',
    license: 'MIT',
    version: '2.0.1',
    commitSha: '4f9e81b',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Official',
    installs: 33100,
    favorites: 6540,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 3200, isExecutable: false }],
    instructions: `---
name: graphrag-knowledge-explorer
description: Build hybrid vector and knowledge graph retrieval pipelines using Neo4j, LangChain GraphIndex, and community clustering.
license: MIT
version: 2.0.1
---

# GraphRAG Principles

1. Extract entities and relationships with schema constraints.
2. Build hierarchical Leiden community summaries for global dataset queries.
3. Combine vector cosine similarity with Cypher multi-hop traversals for local context.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-15T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 37. TESTING - Playwright E2E Automation
  {
    id: 'skill-playwright-e2e-automation',
    slug: 'playwright-e2e-automation',
    name: 'Playwright End-to-End Test Automation',
    description: 'Resilient end-to-end browser testing, auto-waiting locators, visual regression snapshots, and CI matrix execution with Playwright.',
    category: 'testing',
    tags: ['Playwright', 'E2E', 'Testing', 'Automation', 'CI/CD', 'TypeScript'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/playwright-e2e-automation',
    sourceUrl: 'https://github.com/microsoft/playwright',
    license: 'Apache-2.0',
    version: '1.48.0',
    commitSha: '3a1b77c',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 41200,
    favorites: 8190,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 3000, isExecutable: false }],
    instructions: `---
name: playwright-e2e-automation
description: Resilient end-to-end browser testing, auto-waiting locators, visual regression snapshots, and CI matrix execution with Playwright.
license: Apache-2.0
version: 1.48.0
---

# Playwright Test Guidelines

1. Prefer user-facing locators: \`getByRole\`, \`getByText\`, \`getByLabel\`.
2. Avoid hardcoded \`waitForTimeout()\`; rely on Playwright's built-in auto-waiting assertions.
3. Isolate tests with fresh browser contexts and mock external APIs via \`page.route()\`.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-18T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // 38. BACKEND - Stripe Payment Integration
  {
    id: 'skill-stripe-payment-integration',
    slug: 'stripe-payment-integration',
    name: 'Stripe Billing, Subscriptions & Webhook Security',
    description: 'Full integration for Stripe Checkout, Customer Portal, recurring subscriptions, invoice handling, and cryptographic webhook verification.',
    category: 'backend',
    tags: ['Stripe', 'Payments', 'Subscriptions', 'Webhooks', 'Fintech'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/stripe-payment-integration',
    sourceUrl: 'https://github.com/stripe/stripe-node',
    license: 'MIT',
    version: '16.8.0',
    commitSha: '2d8e41a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 39500,
    favorites: 7810,
    isVerified: true,
    isFeatured: false,
    security: {
      isMetadataValid: true,
      isLicenseDetected: true,
      isSourceVerified: true,
      containsScripts: false,
      requiresEnvironmentVariables: true,
      requiresExternalDependencies: false,
      executableFiles: [],
      securityScore: 100,
      warnings: [],
    },
    files: [{ path: 'SKILL.md', type: 'file', size: 3300, isExecutable: false }],
    instructions: `---
name: stripe-payment-integration
description: Full integration for Stripe Checkout, Customer Portal, recurring subscriptions, invoice handling, and cryptographic webhook verification.
license: MIT
version: 16.8.0
---

# Stripe Integration Standards

1. Verify webhook signatures using \`stripe.webhooks.constructEvent\` with the raw body buffer.
2. Implement idempotent webhook handlers using database unique constraints on \`event.id\`.
3. Never store credit card numbers on your server; always use Stripe Elements / Checkout Sessions.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-20T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 39. BACKEND - Rust WebAssembly Core
  {
    id: 'skill-rust-wasm-systems-core',
    slug: 'rust-wasm-systems-core',
    name: 'Rust & WebAssembly High-Performance Modules',
    description: 'Compile high-speed Rust algorithms to WebAssembly with wasm-bindgen, memory views, and JS interoperability.',
    category: 'backend',
    tags: ['Rust', 'WebAssembly', 'Wasm', 'Performance', 'Systems'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/rust-wasm-systems-core',
    sourceUrl: 'https://github.com/rustwasm/wasm-pack',
    license: 'MIT',
    version: '1.0.4',
    commitSha: '1c7a92e',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'gemini'],
    trustLevel: 'Official',
    installs: 26100,
    favorites: 5120,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 2900, isExecutable: false }],
    instructions: `---
name: rust-wasm-systems-core
description: Compile high-speed Rust algorithms to WebAssembly with wasm-bindgen, memory views, and JS interoperability.
license: MIT
version: 1.0.4
---

# Rust & Wasm Compilation Rules

1. Annotate exported structs and functions with \`#[wasm_bindgen]\`.
2. Pass binary data between JS and Rust using \`Uint8Array\` and shared memory pointers.
3. Build optimized release bundles with \`wasm-opt -O4\`.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-22T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // 40. DATABASE - Redis Distributed Caching & Locks
  {
    id: 'skill-redis-distributed-caching',
    slug: 'redis-distributed-caching',
    name: 'Redis Distributed Caching, Redlock & Pub/Sub',
    description: 'Architect low-latency Redis caching layers, distributed locking with Redlock, sliding-window rate limiters, and real-time Pub/Sub queues.',
    category: 'database',
    tags: ['Redis', 'Caching', 'Redlock', 'Rate-Limiting', 'Pub-Sub', 'In-Memory'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/redis-distributed-caching',
    sourceUrl: 'https://github.com/redis/node-redis',
    license: 'MIT',
    version: '4.7.0',
    commitSha: '9e3d12a',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 38400,
    favorites: 7450,
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
name: redis-distributed-caching
description: Architect low-latency Redis caching layers, distributed locking with Redlock, sliding-window rate limiters, and real-time Pub/Sub queues.
license: MIT
version: 4.7.0
---

# Redis Caching & Locking Rules

1. Always specify an explicit TTL on cached keys to prevent unbounded memory growth.
2. Use Redis transactions / Lua scripts for atomic operations (e.g. rate limiters).
3. Acquire distributed locks using Redlock algorithm with auto-releasing timeouts.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-25T00:00:00.000Z',
    updatedAt: '2026-08-30T00:00:00.000Z',
  },

  // 41. PRODUCTIVITY - Turborepo Monorepo Mastery
  {
    id: 'skill-turborepo-monorepo-mastery',
    slug: 'turborepo-monorepo-mastery',
    name: 'Turborepo High-Performance Monorepo Architecture',
    description: 'High-speed build pipelines, remote artifact caching, package dependency graph optimization, and workspace sharing with Turborepo.',
    category: 'productivity',
    tags: ['Turborepo', 'Monorepo', 'Build-Cache', 'Pipelines', 'Workspaces'],
    sourceRepository: SEED_REPOSITORIES['domoskills-official'],
    sourcePath: 'skills/turborepo-monorepo-mastery',
    sourceUrl: 'https://github.com/vercel/turborepo',
    license: 'MPL-2.0',
    version: '2.1.0',
    commitSha: '5c2e11d',
    compatibility: ['universal', 'claude', 'codex', 'cursor', 'opencode', 'copilot', 'gemini'],
    trustLevel: 'Official',
    installs: 35900,
    favorites: 6980,
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
    files: [{ path: 'SKILL.md', type: 'file', size: 3000, isExecutable: false }],
    instructions: `---
name: turborepo-monorepo-mastery
description: High-speed build pipelines, remote artifact caching, package dependency graph optimization, and workspace sharing with Turborepo.
license: MPL-2.0
version: 2.1.0
---

# Turborepo Architecture Rules

1. Define topological pipeline dependencies in \`turbo.json\` with \`dependsOn: ["^build"]\`.
2. Configure granular \`inputs\` and \`outputs\` to maximize remote cache hit ratios.
3. Manage internal package exports using \`package.json\` subpath export maps.
`,
    lastIndexedAt: '2026-08-31T12:00:00.000Z',
    createdAt: '2025-08-28T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Dark Glass Clean Layout
  {
    id: 'skill-dark-glass-clean-layout',
    slug: 'dark-glass-clean-layout',
    name: 'Dark Glass Clean Layout',
    description: 'Create a dark glass layout system with frosted premium shells, clean multi-column workspace structure, floating data cards, and restrained atmospheric depth.',
    category: 'design',
    tags: ["Dark-Mode","Glassmorphism","Design-System","Dashboard","CSS-Backdrop"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/dark-glass-clean-layout',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/dark-glass-clean-layout',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Verified',
    installs: 8420,
    favorites: 732,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/dark-glass-clean-layout.jpg',
    prompt: "Use $dark-glass-clean-layout to build a responsive reference demo:\n\n> Create a dark glass layout system with frosted premium shells, clean multi-column workspace structure, floating data cards, and restrained atmospheric depth.\n\n- Show the treatment on a large Depth without noise surface, one compact metric card, and one control.\n- Use the same edge, shadow, blur, or masking logic consistently across all three scales.\n- Keep CSS and JavaScript inline, responsive from 390px through 1440px.",
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
      { path: 'SKILL.md', type: 'file', size: 1582, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 493, isExecutable: false }
    ],
    instructions: "---\nname: dark-glass-clean-layout\ndescription: Create a dark glass layout system with frosted premium shells, clean multi-column workspace structure, floating data cards, and restrained atmospheric depth.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Dark Glass Clean Layout Design System\n\n## Visual Target\n- Build the page on a near-black base with soft atmospheric light or blurred WebGL texture behind the interface.\n- Use a centered max-width layout shell with thin vertical boundary rails, tiny corner markers, and subtle framing so the page feels housed inside a precise workspace.\n- Create the main hierarchy through dark frosted shells: sidebars, top navigation pills, floating data nodes, and operational cards should all feel glassy but controlled.\n- Keep the palette mostly monochrome with white, zinc, smoke gray, and charcoal. If accent color is needed, derive it from the design or use it only for small state indicators.\n\n## Implementation Guidance\n- Prefer a multi-column workspace layout: left navigation, central hero or visualization stage, and right operational sidebar on desktop, then stack cleanly on smaller screens.\n- Use one-pixel gradient wrappers or faint highlight edges around dark glass shells, then place darker translucent fills inside with strong backdrop blur.\n- Glass surfaces should feel smoky and premium: low-opacity dark fills, crisp top-edge highlights, soft shadow falloff, and restrained internal reflections.\n- Add floating supporting cards near the central stage for logs, intelligence notes, action plans, or system events, with generous spacing.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Agency Grid Layout Minimal
  {
    id: 'skill-agency-grid-layout-minimal',
    slug: 'agency-grid-layout-minimal',
    name: 'Agency Grid Layout Minimal',
    description: 'Create a minimal agency design system with a disciplined editorial grid, oversized typography, quiet uppercase utility labels, restrained image blocks, and subtle structural detail.',
    category: 'design',
    tags: ["Editorial","Grid-Layout","Typography","Minimalism","Portfolio"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/agency-grid-layout-minimal',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/agency-grid-layout-minimal',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","codex"],
    trustLevel: 'Verified',
    installs: 9150,
    favorites: 840,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/agency-grid-layout-minimal.jpg',
    prompt: "Use $agency-grid-layout-minimal to recreate the design quality and behavior of Freelance Designer & Growth Partner:\n\n> Create a minimal agency design system with a disciplined editorial grid, oversized typography, quiet uppercase utility labels, restrained image blocks, and subtle structural detail.\n\n- Build the page on a disciplined multi-column grid with large open spans, careful alignment, and generous negative space.\n- Use oversized headlines with tight tracking and strong line breaks as the primary visual anchor.",
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
      { path: 'SKILL.md', type: 'file', size: 1141, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 523, isExecutable: false }
    ],
    instructions: "---\nname: agency-grid-layout-minimal\ndescription: Create a minimal agency design system with a disciplined editorial grid, oversized typography, quiet uppercase utility labels, restrained image blocks, and subtle structural detail.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Agency Grid Layout Minimal Design System\n\n## Visual Target\n- Build the page on a disciplined multi-column grid with large open spans, careful alignment, and generous negative space.\n- Use oversized headlines with tight tracking and strong line breaks as the primary visual anchor.\n- Treat images as quiet architectural blocks: sharp edges, minimal radii, restrained captions, and consistent aspect ratios.\n- Keep structural lines visible but quiet: hairline row dividers, column guides, and tiny registration marks that emphasize precision.\n\n## Implementation Guidance\n- Choose high-contrast monochrome with intentional warm-gray or paper-white backing.\n- Use mono uppercase labels (0.75rem, letter-spacing: 0.15em) above major sections for utility metadata.\n- Motion should be subtle: 200ms opacity fades on interaction, smooth height transitions, and zero bouncy springs.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Clean Minimal Beige Light Mode
  {
    id: 'skill-clean-minimal-beige-light-mode',
    slug: 'clean-minimal-beige-light-mode',
    name: 'Clean Minimal Beige Light Mode',
    description: 'Create a clean minimal beige light mode website design with warm editorial paper tones, understated serif accents, generous whitespace, and sharp high-contrast typography.',
    category: 'design',
    tags: ["Light-Mode","Editorial","Beige","Warm-Paper","Typography"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/clean-minimal-beige-light-mode',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/clean-minimal-beige-light-mode',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor"],
    trustLevel: 'Verified',
    installs: 7680,
    favorites: 610,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/clean-minimal-beige-light-mode.jpg',
    prompt: "Use $clean-minimal-beige-light-mode to recreate the design quality and behavior of MentorBridge:\n\n> Create a clean minimal beige light mode website design with warm editorial paper tones, understated serif accents, generous whitespace, and sharp high-contrast typography.\n\n- Content anchors: Find a mentor to help you grow your career ┬╖ Simple steps from curiosity to confidence ┬╖ Filter and 1:1 booking flow.",
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
      { path: 'SKILL.md', type: 'file', size: 676, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 409, isExecutable: false }
    ],
    instructions: "---\nname: clean-minimal-beige-light-mode\ndescription: Create a clean minimal beige light mode website design with warm editorial paper tones, understated serif accents, generous whitespace, and sharp high-contrast typography.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Clean Minimal Beige Light Mode System\n\n## Visual Target\n- Warm beige canvas background (#f8f6f0 or #f5f2eb) paired with deep charcoal (#1a1a18) text.\n- Editorial pairing: modern humanist sans-serif headers paired with classic literary serifs for subtext.\n- Ample negative space: sections breathe with 80px to 140px vertical gutters.\n- Soft tactile cards with hairline warm-gray borders and negligible drop shadows.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Orange Clean Paper SaaS
  {
    id: 'skill-orange-clean-paper-saas',
    slug: 'orange-clean-paper-saas',
    name: 'Orange Clean Paper SaaS',
    description: 'Build a high-converting SaaS landing page with clean warm paper styling, vivid safety-orange callouts, structured feature comparison, and crisp micro-borders.',
    category: 'frontend',
    tags: ["SaaS","Landing-Page","Paper-Texture","Conversion","Pricing"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/orange-clean-paper-saas',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/orange-clean-paper-saas',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Verified',
    installs: 8940,
    favorites: 790,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/orange-clean-paper-saas.jpg',
    prompt: "Use $orange-clean-paper-saas to recreate the design quality and behavior of PaperFlow Design Layout:\n\n> Build a high-converting SaaS landing page with clean warm paper styling, vivid safety-orange callouts, structured feature comparison, and crisp micro-borders.\n\n- Content anchors: Streamline operations with smart workflows ┬╖ Refined product assets ┬╖ High-contrast plan comparison.",
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
      { path: 'SKILL.md', type: 'file', size: 581, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 383, isExecutable: false }
    ],
    instructions: "---\nname: orange-clean-paper-saas\ndescription: Build a high-converting SaaS landing page with clean warm paper styling, vivid safety-orange callouts, structured feature comparison, and crisp micro-borders.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Orange Clean Paper SaaS Architecture\n\n## Visual Target\n- Off-white paper background (#fdfcf9) contrasted with energetic safety-orange (#ff5a1f) accents.\n- Strict rectangular framing with crisp 1px borders (#e8e5dc) and minimal border radius (4px).\n- Feature comparison blocks organized as tabular index cards with high information density.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Tech Green Dark Mode Modern
  {
    id: 'skill-tech-green-dark-mode-modern',
    slug: 'tech-green-dark-mode-modern',
    name: 'Tech Green Dark Mode Modern',
    description: 'Design a modern developer-focused tech platform with dark slate surfaces, electric neon green telemetry indicators, high-density terminal cards, and monospace data badges.',
    category: 'design',
    tags: ["Developer-Tool","Dark-Mode","Neon-Green","Terminal","Telemetry"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/tech-green-dark-mode-modern',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/tech-green-dark-mode-modern',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","opencode"],
    trustLevel: 'Verified',
    installs: 11200,
    favorites: 1040,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/tech-green-dark-mode-modern.jpg',
    prompt: "Use $tech-green-dark-mode-modern to build a responsive reference demo:\n\n> Create a modern dark-mode technical design system with matte-black surfaces, emerald signal accents, mono system labeling, framed dashboard cards, and restrained glow.\n\n- Build a complete editorial hero and supporting card grid that clearly expresses the telemetry console visual system.",
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
      { path: 'SKILL.md', type: 'file', size: 569, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 361, isExecutable: false }
    ],
    instructions: "---\nname: tech-green-dark-mode-modern\ndescription: Design a modern developer-focused tech platform with dark slate surfaces, electric neon green telemetry indicators, high-density terminal cards, and monospace data badges.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Tech Green Dark Mode System\n\n## Visual Target\n- Deep matte black (#09090b) surfaces paired with vivid emerald/neon green (#10b981 / #00ff88) telemetry beacons.\n- Terminal-inspired data panels, execution counters, and uptime metrics.\n- Subdued scanline patterns and 1px borders with localized radial green glow.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Blue Cloudy Clean Modern
  {
    id: 'skill-blue-cloudy-clean-modern',
    slug: 'blue-cloudy-clean-modern',
    name: 'Blue Cloudy Clean Modern',
    description: 'Craft a modern enterprise cloud interface with subtle atmospheric sky-blue glow, clean card elevation, crisp typography, and streamlined workflows.',
    category: 'frontend',
    tags: ["Cloud","Enterprise","Atmospheric-Blue","Modern-UI","Clean"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/blue-cloudy-clean-modern',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/blue-cloudy-clean-modern',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","copilot"],
    trustLevel: 'Verified',
    installs: 8120,
    favorites: 670,
    isVerified: true,
    isFeatured: false,
    previewImage: '/skill-previews/blue-cloudy-clean-modern.jpg',
    prompt: "Use $blue-cloudy-clean-modern to recreate the design quality and behavior of Platform Capabilities:\n\n> Craft a modern enterprise cloud interface with subtle atmospheric sky-blue glow, clean card elevation, crisp typography, and streamlined workflows.\n\n- Content anchors: Platform Capabilities ┬╖ Universal Compatibility ┬╖ Ultra-Low Latency ┬╖ Smart Structuring.",
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
      { path: 'SKILL.md', type: 'file', size: 557, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 359, isExecutable: false }
    ],
    instructions: "---\nname: blue-cloudy-clean-modern\ndescription: Craft a modern enterprise cloud interface with subtle atmospheric sky-blue glow, clean card elevation, crisp typography, and streamlined workflows.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Blue Cloudy Clean Enterprise Layout\n\n## Visual Target\n- Atmospheric sky blue (#0ea5e9 to #3b82f6) ambient wash behind clean floating enterprise cards.\n- Elevated surface cards with multi-layer shadows (0 10px 30px -5px rgba(14, 165, 233, 0.12)).\n- Clean workflow diagrams, status indicators, and collapsible inspector panels.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Editorial Portfolio Chapters
  {
    id: 'skill-editorial-portfolio-chapters',
    slug: 'editorial-portfolio-chapters',
    name: 'Editorial Portfolio Chapters',
    description: 'Design an editorial portfolio split into curated chapters, with magazine-style multi-column typography, immersive full-bleed imagery, and smooth chapter transitions.',
    category: 'design',
    tags: ["Portfolio","Editorial","Magazine","Typography","Transitions"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/editorial-portfolio-chapters',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/editorial-portfolio-chapters',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor"],
    trustLevel: 'Verified',
    installs: 6940,
    favorites: 710,
    isVerified: true,
    isFeatured: false,
    previewImage: '/skill-previews/editorial-portfolio-chapters.jpg',
    prompt: "Use $editorial-portfolio-chapters to create an original responsive creative-studio portfolio:\n\n> Build a near-black page with compact pill navigation at the outer edges, a centered wordmark, and a mostly full-viewport campaign hero. Continue into a muted lavender project chapter with oversized titles, square media, and slow editorial motion.",
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
      { path: 'SKILL.md', type: 'file', size: 563, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 343, isExecutable: false }
    ],
    instructions: "---\nname: editorial-portfolio-chapters\ndescription: Design an editorial portfolio split into curated chapters, with magazine-style multi-column typography, immersive full-bleed imagery, and smooth chapter transitions.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Editorial Portfolio Chapters\n\n## Visual Target\n- Structured chapter navigation: \"01 / Brand Strategy\", \"02 / Digital Platform\", \"03 / Packaging\".\n- Magazine layout with asymmetrical column gutters and prominent quotes.\n- Full-bleed media transitions that zoom gently on scroll without disrupting reading pace.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Framed Tech Dark Border Gradient
  {
    id: 'skill-framed-tech-dark-border-gradient',
    slug: 'framed-tech-dark-border-gradient',
    name: 'Framed Tech Dark Border Gradient',
    description: 'Create a framed tech dark mode system with gradient-stroked structural containers, subtle corner crosshairs, and layered cyber-industrial UI cards.',
    category: 'design',
    tags: ["Cyber-UI","Border-Gradient","Dark-Mode","Containers","Industrial"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/framed-tech-dark-border-gradient',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/framed-tech-dark-border-gradient',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","codex"],
    trustLevel: 'Verified',
    installs: 8870,
    favorites: 755,
    isVerified: true,
    isFeatured: false,
    previewImage: '/skill-previews/framed-tech-dark-border-gradient.jpg',
    prompt: "Use $framed-tech-dark-border-gradient to build a responsive reference demo:\n\n> Create a framed dark technical design system with border-gradient shells, asymmetrical grid panels, mono utility labeling, and restrained monochrome atmosphere.\n\n- Compare the treatment across a hero surface, compact control, and detail card.",
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
      { path: 'SKILL.md', type: 'file', size: 559, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 321, isExecutable: false }
    ],
    instructions: "---\nname: framed-tech-dark-border-gradient\ndescription: Create a framed tech dark mode system with gradient-stroked structural containers, subtle corner crosshairs, and layered cyber-industrial UI cards.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Framed Tech Dark Border Gradient System\n\n## Visual Target\n- Dark carbon background with 1px gradient borders fading from white/cyan to transparent.\n- Mechanical corner registration marks (+) and technical coordinate tags (e.g. LAT/LNG or node IDs).\n- High precision architectural layout with clear container modularity.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - High Contrast Skeuomorphic Clean
  {
    id: 'skill-high-contrast-skeuomorphic-clean',
    slug: 'high-contrast-skeuomorphic-clean',
    name: 'High Contrast Skeuomorphic Clean',
    description: 'Create a tactile high-contrast interface combining modern skeuomorphic inset bevels, tactile button depressions, realistic metallic highlights, and ultra-crisp monochrome contrasts.',
    category: 'design',
    tags: ["Skeuomorphism","Tactile-UI","High-Contrast","Bevels","Hardware-Feel"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/high-contrast-skeuomorphic-clean',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/high-contrast-skeuomorphic-clean',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor"],
    trustLevel: 'Verified',
    installs: 9340,
    favorites: 880,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/high-contrast-skeuomorphic-clean.jpg',
    prompt: "Use $high-contrast-skeuomorphic-clean to recreate the design quality and behavior of Core Interface:\n\n> Create a tactile high-contrast interface combining modern skeuomorphic inset bevels, tactile button depressions, realistic metallic highlights, and ultra-crisp monochrome contrasts.\n\n- Content anchors: Timeline ┬╖ Messages ┬╖ Pending Actions ┬╖ Active Media ┬╖ Vitals Monitor.",
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
      { path: 'SKILL.md', type: 'file', size: 622, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 376, isExecutable: false }
    ],
    instructions: "---\nname: high-contrast-skeuomorphic-clean\ndescription: Create a tactile high-contrast interface combining modern skeuomorphic inset bevels, tactile button depressions, realistic metallic highlights, and ultra-crisp monochrome contrasts.\nlicense: MIT\nversion: 1.0.0\n---\n\n# High Contrast Modern Skeuomorphism\n\n## Visual Target\n- Physical hardware-inspired UI components: tactile rotary dials, etched toggle switches, and recessed displays.\n- Dual drop-shadow technique: 1px crisp top white highlight coupled with deep bottom ambient shadow.\n- Realistic tactile depression on :active state with sub-millimeter displacement.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - Cobe 3D Interactive WebGL Globe
  {
    id: 'skill-cobejs',
    slug: 'cobejs',
    name: 'Cobe 3D Interactive WebGL Globe',
    description: 'Implement an interactive, lightweight WebGL globe using Cobe with customizable markers, smooth auto-rotation, location ping animations, and responsive canvas sizing.',
    category: 'frontend',
    tags: ["WebGL","Globe","3D","Canvas","Interactive"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/cobejs',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/cobejs',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","codex"],
    trustLevel: 'Verified',
    installs: 10450,
    favorites: 920,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/cobejs.jpg',
    prompt: "Use $cobejs to build a responsive reference demo:\n\n> Use when adding a lightweight interactive globe with cobe (canvas setup, markers, interaction, performance, integration with React/Next.js).\n\n- Center a luminous orbital data globe inside a restrained technical interface.",
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
      { path: 'SKILL.md', type: 'file', size: 547, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 274, isExecutable: false }
    ],
    instructions: "---\nname: cobejs\ndescription: Implement an interactive, lightweight WebGL globe using Cobe with customizable markers, smooth auto-rotation, location ping animations, and responsive canvas sizing.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Cobe 3D Interactive WebGL Globe\n\n## Core Patterns\n1. Lightweight Canvas Setup: Mount canvas with spring-based rotation physics.\n2. Custom Location Markers: Map lat/lng coordinates to interactive pulsing SVG beacons.\n3. Performance Guardrails: Throttle render loops on background tabs, support pointer drag rotation.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - High-Converting SaaS Pricing Page
  {
    id: 'skill-pricing-page',
    slug: 'pricing-page',
    name: 'High-Converting SaaS Pricing Page',
    description: 'Create a high-converting multi-tier SaaS pricing page with monthly/annual billing toggles, featured tier highlight, feature matrix comparison, and objection-busting FAQ.',
    category: 'frontend',
    tags: ["Pricing","Conversion","SaaS","Billing-Toggle","Feature-Matrix"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/pricing-page',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/pricing-page',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","codex"],
    trustLevel: 'Verified',
    installs: 12400,
    favorites: 1180,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/pricing-page.jpg',
    prompt: "Use $pricing-page to build a responsive reference demo:\n\n> Use when designing or rewriting a high-converting SaaS pricing page (structure, plan design, copywriting, SEO/AEO, FAQs, layout patterns, experiments).\n\n- Use a three-plan conversion layout with one clearly recommended plan, monthly/annual toggle, and comprehensive feature matrix.",
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
      { path: 'SKILL.md', type: 'file', size: 674, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 340, isExecutable: false }
    ],
    instructions: "---\nname: pricing-page\ndescription: Create a high-converting multi-tier SaaS pricing page with monthly/annual billing toggles, featured tier highlight, feature matrix comparison, and objection-busting FAQ.\nlicense: MIT\nversion: 1.0.0\n---\n\n# High-Converting SaaS Pricing Page Architecture\n\n## Visual & Conversion Standards\n1. Plan Cards: 3 tiers (Starter, Pro / Recommended, Enterprise). Pro tier elevated with glowing border.\n2. Billing Toggle: Annual vs Monthly with explicit \"Save 20%\" badge.\n3. Feature Comparison Matrix: Full breakdown with checkmarks and tooltips.\n4. Risk Reversal: 14-day free trial, no credit card required badge, and money-back guarantee guarantee.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - High-Converting SaaS Landing Page
  {
    id: 'skill-landing-page',
    slug: 'landing-page',
    name: 'High-Converting SaaS Landing Page',
    description: 'Create a high-converting single-offer landing page with clear hero value proposition, social proof logos, interactive product showcase, benefit breakdown, and risk reversal.',
    category: 'frontend',
    tags: ["Landing-Page","Hero-Section","Conversion","Copywriting","Social-Proof"],
    sourceRepository: SEED_REPOSITORIES['mengto-skills'],
    sourcePath: 'agent-skills/web-design/landing-page',
    sourceUrl: 'https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/landing-page',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '3d91ea4',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Verified',
    installs: 14200,
    favorites: 1350,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/landing-page.jpg',
    prompt: "Use $landing-page to build a responsive reference demo:\n\n> Use when designing or rewriting a high-converting landing page (single-offer page) for SaaS/apps/services. Covers structure, layout patterns, conversion strategies, copywriting, SEO/AEO, and common pitfalls.\n\n- Use a focused single-offer hero, benefit proof, and one primary call to action.",
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
      { path: 'SKILL.md', type: 'file', size: 787, isExecutable: false },
      { path: 'demo/preview.jpg', type: 'file', size: 65000, isExecutable: false },
      { path: 'demo/PROMPT.md', type: 'file', size: 349, isExecutable: false }
    ],
    instructions: "---\nname: landing-page\ndescription: Create a high-converting single-offer landing page with clear hero value proposition, social proof logos, interactive product showcase, benefit breakdown, and risk reversal.\nlicense: MIT\nversion: 1.0.0\n---\n\n# High-Converting SaaS Landing Page Architecture\n\n## Core Structure\n1. Above the Fold: Headline (outcome + audience), Subheadline (mechanism), Primary CTA, and Proof Signal.\n2. Problem -> Solution: Direct contrast between current painful state and streamlined future state.\n3. Interactive Product Showcase: Simulated dashboard or interactive demo widget.\n4. Social Proof: Logo strip of marquee customers, verified user testimonials, and trust badges.\n5. Risk Reversal & Bottom CTA: Clear reassurance, FAQ accordion, and decisive action button.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - TypeUI Design Engineering System
  {
    id: 'skill-typeui-design-system',
    slug: 'typeui-design-system',
    name: 'TypeUI Design Engineering System',
    description: 'Systematic UI component extraction, DESIGN.md specification generation, and responsive typography token engineering for AI coding agents.',
    category: 'design',
    tags: ["TypeUI","DESIGN.md","Design-Tokens","Typography","Component-Architecture"],
    sourceRepository: SEED_REPOSITORIES['typeui-org'],
    sourcePath: 'skills/typeui-design-system',
    sourceUrl: 'https://www.typeui.sh/design-skills',
    license: 'MIT',
    version: '2.0.0',
    commitSha: '8f4a21e',
    compatibility: ["universal","claude","cursor","codex","gemini"],
    trustLevel: 'Official',
    installs: 18450,
    favorites: 2140,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/typeui-design-skill.jpg',
    prompt: "Use $typeui-design-system to extract, generate, and enforce systematic UI component hierarchies, DESIGN.md specifications, and responsive design tokens for AI coding agents:\n\n> Create a disciplined, component-driven UI architecture with atomic design tokens, strict spacing hierarchies (4px/8px rhythm), and automated DESIGN.md alignment.\n\n- Map typography, surface contrast, and interactive states to semantic tokens.\n- Generate modular, framework-agnostic component definitions with clear props and variants.",
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
      { path: 'SKILL.md', type: 'file', size: 648, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: typeui-design-system\ndescription: Systematic UI component extraction, DESIGN.md specification generation, and responsive typography token engineering for AI coding agents.\nlicense: MIT\nversion: 2.0.0\n---\n\n# TypeUI Design Engineering System\n\n## Core Guidelines\n1. **Design Token Architecture**: Every spacing, typography, and color token maps to CSS variables and Tailwind utilities.\n2. **DESIGN.md Generation**: Automatically summarize project design rules into a persistent DESIGN.md reference file.\n3. **Atomic Hierarchy**: Tokens -> Atoms (Button, Badge, Input) -> Molecules (Card, Form, SearchBar) -> Organisms (Navbar, Hero, Table).\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: Glassmorphism Design System
  {
    id: 'skill-uupm-glassmorphism-system',
    slug: 'uupm-glassmorphism-system',
    name: 'UI/UX Pro Max: Glassmorphism Design System',
    description: 'Multi-layered frosted glass interfaces with 1px translucent border highlights, backdrop-filter blur(16px), dark-mode depth, and high-contrast typography.',
    category: 'design',
    tags: ["UI-UX-Pro-Max","Glassmorphism","Dark-Mode","Backdrop-Filter","Blur-Depth"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/glassmorphism-ui',
    sourceUrl: 'https://www.uupm.cc/#styles',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","gemini","copilot"],
    trustLevel: 'Official',
    installs: 24600,
    favorites: 3180,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/glassmorphism-ui.jpg',
    prompt: "Use $uupm-glassmorphism-system to generate multi-layered frosted glass interfaces with 1px translucent border highlights, backdrop-filter blur(16px), dark-mode depth, and high-contrast typography:\n\n> Synthesize a dark glass UI console with translucent surface cards (rgba(255, 255, 255, 0.05)), 1px subtle top highlights (rgba(255, 255, 255, 0.15)), ambient dark backdrops, and glowing neon accents.\n\n- Enforce readable WCAG 2.2 contrast across all translucent surfaces.\n- Provide hardware-accelerated backdrop blur with graceful fallbacks.",
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
      { path: 'SKILL.md', type: 'file', size: 659, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-glassmorphism-system\ndescription: Multi-layered frosted glass interfaces with 1px translucent border highlights, backdrop-filter blur(16px), dark-mode depth, and high-contrast typography.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - Glassmorphism System\n\n## Visual Rules\n1. Background: Dark carbon or deep slate base (#0a0a0f to #121218).\n2. Glass Cards: `background: rgba(255, 255, 255, 0.04)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255, 255, 255, 0.1)`.\n3. Highlights: Inset top highlight `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15)`.\n4. Typography: Ultra-crisp high-contrast white text (#ffffff and #a1a1aa).\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: 95 Product Color Systems
  {
    id: 'skill-uupm-color-palettes',
    slug: 'uupm-color-palettes',
    name: 'UI/UX Pro Max: 95 Product Color Systems',
    description: 'Product-specific harmonic 6-tier color systems optimized for SaaS, Fintech, Healthcare, and E-commerce with WCAG AAA accessibility standards.',
    category: 'design',
    tags: ["UI-UX-Pro-Max","Color-Palettes","SaaS","Fintech","Accessibility"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/color-palettes',
    sourceUrl: 'https://www.uupm.cc/#palettes',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Official',
    installs: 19800,
    favorites: 2640,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/color-palettes.jpg',
    prompt: "Use $uupm-color-palettes to generate 6-tier harmonic color systems (Primary, Secondary, CTA, Surface, Text, Border) optimized for SaaS, Fintech, Healthcare, and E-commerce:\n\n> Select or generate an industry-calibrated color palette that satisfies WCAG 2.2 AAA contrast ratios, supports automatic light/dark mode inversions, and establishes clear visual hierarchy between utility elements and call-to-action buttons.",
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
      { path: 'SKILL.md', type: 'file', size: 689, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-color-palettes\ndescription: Product-specific harmonic 6-tier color systems optimized for SaaS, Fintech, Healthcare, and E-commerce with WCAG AAA accessibility standards.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - 95 Product Color Systems\n\n## Palette Tiers\n1. Primary: Brand identity and primary focal points.\n2. Secondary: Supporting visual accents and category badges.\n3. CTA (Call To Action): High-conversion button color with distinct contrast.\n4. Surface: Multi-tier background elevation (surface, surface-raised, surface-overlay).\n5. Text: High-contrast headings and readable muted secondary copy.\n6. Border: Hairline structural delimiters (1px opacity-based).\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: 56 Font Pairings & Scale Engine
  {
    id: 'skill-uupm-typography-pairings',
    slug: 'uupm-typography-pairings',
    name: 'UI/UX Pro Max: 56 Font Pairings & Scale Engine',
    description: 'Curated Google Fonts pairings, fluid typographic scale calculations, responsive line-height ratios, and Tailwind typography configurations.',
    category: 'design',
    tags: ["UI-UX-Pro-Max","Typography","Font-Pairings","Google-Fonts","Type-Scales"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/typography-system',
    sourceUrl: 'https://www.uupm.cc/#typography',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","codex"],
    trustLevel: 'Official',
    installs: 21300,
    favorites: 2890,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/typography-system.jpg',
    prompt: "Use $uupm-typography-pairings to generate harmonious type scales, Google Fonts integration (Space Grotesk + Inter, Playfair + Plus Jakarta Sans), and responsive line-height ratios:\n\n> Establish a dual-font typographic hierarchy with fluid clamp() scaling for headline, subheadline, body, and monospace utility metadata. Ensure font loading optimizations with font-display: swap.",
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
      { path: 'SKILL.md', type: 'file', size: 553, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-typography-pairings\ndescription: Curated Google Fonts pairings, fluid typographic scale calculations, responsive line-height ratios, and Tailwind typography configurations.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - Font Pairings & Scale Engine\n\n## Recommended Pairings\n1. Modern Tech: Space Grotesk (Headers) + Inter (Body).\n2. Editorial Luxury: Playfair Display (Headers) + Plus Jakarta Sans (Body).\n3. Developer Native: JetBrains Mono (Code/Metrics) + Geist Sans (Interface).\n4. SaaS Clean: Outfit (Headlines) + Roboto (Body).\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: Production Component Library
  {
    id: 'skill-uupm-component-crafting',
    slug: 'uupm-component-crafting',
    name: 'UI/UX Pro Max: Production Component Library',
    description: 'Modular atomic UI components with interactive hover transitions, accessible ARIA states, keyboard navigation, and responsive container queries.',
    category: 'frontend',
    tags: ["UI-UX-Pro-Max","Components","Atomic-Design","Tailwind","Accessibility"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/ui-components',
    sourceUrl: 'https://www.uupm.cc/#components',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Official',
    installs: 27800,
    favorites: 3750,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/ui-components.jpg',
    prompt: "Use $uupm-component-crafting to synthesize accessible, production-ready interactive components with keyboard navigation, active state animations, and modular atomic design:\n\n> Generate reusable UI components including buttons, modal dialogs, segmented controls, input fields, and metric cards with integrated Tailwind classes and full keyboard accessibility.",
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
      { path: 'SKILL.md', type: 'file', size: 497, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-component-crafting\ndescription: Modular atomic UI components with interactive hover transitions, accessible ARIA states, keyboard navigation, and responsive container queries.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - Production Component Library\n\n## Component Guidelines\n1. States: default, hover, active, focus-visible, disabled, loading.\n2. Accessibility: Keyboard navigable, ARIA attributes, semantic HTML.\n3. Animation: Micro-feedback on interaction (0.15s ease-out).\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: UX Guidelines & Heuristics Guard
  {
    id: 'skill-uupm-ux-heuristics-guard',
    slug: 'uupm-ux-heuristics-guard',
    name: 'UI/UX Pro Max: UX Guidelines & Heuristics Guard',
    description: 'UX guidelines, cognitive load reduction, 44x44px minimum tap targets, WCAG 2.2 contrast compliance, z-index hierarchy, and loading state skeletons.',
    category: 'design',
    tags: ["UI-UX-Pro-Max","UX-Guidelines","Heuristics","WCAG","Accessibility"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/ux-guidelines',
    sourceUrl: 'https://www.uupm.cc/#guidelines',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","codex","gemini"],
    trustLevel: 'Official',
    installs: 16500,
    favorites: 2210,
    isVerified: true,
    isFeatured: false,
    previewImage: '/skill-previews/ux-guidelines.jpg',
    prompt: "Use $uupm-ux-heuristics-guard to audit and enforce cognitive load reduction, accessible tap targets (44x44px), WCAG 2.2 contrast compliance, z-index hierarchy, and loading state skeletons:\n\n> Audit and correct interface usability anti-patterns, ensure consistent focus management, and eliminate layout shifts with designated skeleton placeholders.",
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
      { path: 'SKILL.md', type: 'file', size: 562, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-ux-heuristics-guard\ndescription: UX guidelines, cognitive load reduction, 44x44px minimum tap targets, WCAG 2.2 contrast compliance, z-index hierarchy, and loading state skeletons.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - UX Guidelines & Heuristics\n\n## Universal Rules\n1. Minimum Tap Target: 44px by 44px on mobile viewports.\n2. Contrast: 4.5:1 for normal text, 3:1 for large text.\n3. Loading States: Use content-shaped skeleton cards instead of generic spinners.\n4. Error Prevention: Validate inputs inline with clear correction hints.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: 29 Landing Page Architectures
  {
    id: 'skill-uupm-conversion-landing-patterns',
    slug: 'uupm-conversion-landing-patterns',
    name: 'UI/UX Pro Max: 29 Landing Page Architectures',
    description: 'Conversion-optimized landing page blueprints with strategic CTA positioning, social proof strips, product demonstration cards, and objection handling FAQs.',
    category: 'frontend',
    tags: ["UI-UX-Pro-Max","Landing-Patterns","Conversion","Hero-Sections","SaaS"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/landing-patterns',
    sourceUrl: 'https://www.uupm.cc/#landing-patterns',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Official',
    installs: 23100,
    favorites: 3040,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/landing-patterns.jpg',
    prompt: "Use $uupm-conversion-landing-patterns to build high-converting hero-first, video-first, and pricing-first layouts with strategic CTA positioning, social proof strips, and objection handling:\n\n> Construct a full-page conversion layout following the 6-step architecture: Hero value anchor -> Trust badge marquee -> Problem/Solution contrast -> Interactive product demonstration -> Plan comparison -> Final risk reversal CTA.",
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
      { path: 'SKILL.md', type: 'file', size: 623, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-conversion-landing-patterns\ndescription: Conversion-optimized landing page blueprints with strategic CTA positioning, social proof strips, product demonstration cards, and objection handling FAQs.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - 29 Landing Page Architectures\n\n## Conversion Framework\n1. Hero Above Fold: Clear value proposition within 5 seconds.\n2. Social Proof: Customer logos, user review counts, security certifications.\n3. Product Reality: Live screenshots or interactive widgets showing actual interface.\n4. Pricing & Risk Reversal: Transparent plans, FAQ accordion, guarantee badge.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: Motion Design & Micro-Interactions
  {
    id: 'skill-uupm-motion-physics-engine',
    slug: 'uupm-motion-physics-engine',
    name: 'UI/UX Pro Max: Motion Design & Micro-Interactions',
    description: 'Physics-based spring animation presets (stiffness: 300, damping: 24), layout choreography, gesture-driven hover states, and automatic reduced-motion accessibility.',
    category: 'design',
    tags: ["UI-UX-Pro-Max","Motion","Micro-Interactions","Spring-Physics","Framer-Motion"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'skills/animation-motion',
    sourceUrl: 'https://www.uupm.cc/#animation',
    license: 'MIT',
    version: '3.5.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","opencode"],
    trustLevel: 'Official',
    installs: 20900,
    favorites: 2780,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/animation-motion.jpg',
    prompt: "Use $uupm-motion-physics-engine to build responsive micro-interactions, layout choreography, physics-based springs (stiffness: 300, damping: 24), and automatic prefers-reduced-motion fallbacks:\n\n> Orchestrate fluid UI transitions with spring physics, staggered list entrances (0.05s stagger children), and tactile hover scale feedback.",
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
      { path: 'SKILL.md', type: 'file', size: 505, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-motion-physics-engine\ndescription: Physics-based spring animation presets (stiffness: 300, damping: 24), layout choreography, gesture-driven hover states, and automatic reduced-motion accessibility.\nlicense: MIT\nversion: 3.5.0\n---\n\n# UI/UX Pro Max - Motion & Animation Engine\n\n## Spring Physics Presets\n- Snappy: `{ stiffness: 400, damping: 28 }` (Buttons, toggles)\n- Smooth: `{ stiffness: 260, damping: 20 }` (Cards, drawers)\n- Gentle: `{ stiffness: 120, damping: 14 }` (Page transitions)\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },

  // UI SKILL - UI/UX Pro Max: Pet Care & Service Landing Page
  {
    id: 'skill-uupm-pet-grooming-demo',
    slug: 'uupm-pet-grooming-demo',
    name: 'UI/UX Pro Max: Pet Care & Service Landing Page',
    description: 'Playful, high-converting pet care service landing page with Fredoka + Nunito typography, warm cheerful palette, and 1-click booking flow.',
    category: 'frontend',
    tags: ["UI-UX-Pro-Max","Pet-Service","Playful-UI","Booking-Flow","Demo"],
    sourceRepository: SEED_REPOSITORIES['uupm-pro-max'],
    sourcePath: 'demos/pet-grooming',
    sourceUrl: 'https://www.uupm.cc/demo/pet-grooming',
    license: 'MIT',
    version: '1.0.0',
    commitSha: '9e1d84b',
    compatibility: ["universal","claude","cursor","gemini"],
    trustLevel: 'Official',
    installs: 14200,
    favorites: 1890,
    isVerified: true,
    isFeatured: true,
    previewImage: '/skill-previews/pet-grooming-spa.png',
    prompt: "Build a landing page for a pet grooming service. Playful and friendly style, with booking CTA:\n\n- Style: Playful, friendly, warm, accessible.\n- Typography: Fredoka (headings) + Nunito (body).\n- Colors: Primary (#3B82F6), Secondary (#60A5FA), CTA (#F97316), Background (#F8FAFC), Text (#1E293B).\n- Sections: Hero with outcome headline -> Service cards -> Testimonials -> 1-click booking form.",
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
      { path: 'SKILL.md', type: 'file', size: 520, isExecutable: false },
      { path: 'preview.jpg', type: 'file', size: 85000, isExecutable: false }
    ],
    instructions: "---\nname: uupm-pet-grooming-demo\ndescription: Playful, high-converting pet care service landing page with Fredoka + Nunito typography, warm cheerful palette, and 1-click booking flow.\nlicense: MIT\nversion: 1.0.0\n---\n\n# Pet Grooming & Spa Live Demo System\n\n## UI Specifications\n- Background: Soft sky paper (#F8FAFC).\n- Header Typography: Fredoka font with friendly rounded characters.\n- Body Typography: Nunito font for high legibility.\n- Primary CTA: High-conversion orange (#F97316) button with active scale feedback.\n",
    lastIndexedAt: '2026-08-31T18:00:00.000Z',
    createdAt: '2025-06-15T00:00:00.000Z',
    updatedAt: '2026-08-31T00:00:00.000Z',
  },
];


