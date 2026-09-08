# DomoSkills — The Open Agent Skills Marketplace

```text
DOMOSKILLS_
Open skills. Smarter agents. Your stack.
```

<div align="center">
  <img src="apps/web/public/assets/domoskills-app-icon.png" width="120" height="120" alt="DomoSkills App Icon" style="border-radius: 24px;" />
  <br />
  <img src="apps/web/public/assets/domoskills-mascot.gif" width="96" height="96" alt="DomoSkills Animated Mascot" />
  <p><strong>The free, open-source capability registry and CLI package manager for AI Agent Skills.</strong></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
  [![Turborepo](https://img.shields.io/badge/turborepo-monorepo-EF4444.svg)](https://turbo.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6.svg)](https://www.typescriptlang.org/)
  [![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/darknecrocities/DomoSkills/pulls)
</div>

DomoSkills is a developer-native discovery engine and CLI installer for **AI Agent Skills**. Discover modular capabilities, curate your project's skill stack, and install directly into your AI coding assistant workspace in a single command.

Whether you build with **Google Antigravity**, **Claude Code**, **Cursor IDE**, **OpenAI Codex/Agents**, **GitHub Copilot**, or **OpenCode Interpreter**, DomoSkills standardizes capability discovery, frontmatter validation, AST security scanning, and reproducible lockfile management across your entire team.

---

## Table of Contents

- [Quick Start](#quick-start)
  - [1. Discover Skills](#1-discover-skills)
  - [2. Add Skills to Your Project](#2-add-skills-to-your-project)
  - [3. Initialize & Diagnose Workspace](#3-initialize--diagnose-workspace)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Supported Agent Target Ecosystems](#supported-agent-target-ecosystems)
- [CLI Command Reference](#cli-command-reference)
  - [`domoskills init`](#domoskills-init)
  - [`domoskills search`](#domoskills-search)
  - [`domoskills add`](#domoskills-add)
  - [`domoskills install`](#domoskills-install)
  - [`domoskills remove`](#domoskills-remove)
  - [`domoskills list`](#domoskills-list)
  - [`domoskills doctor`](#domoskills-doctor)
  - [`domoskills audit`](#domoskills-audit)
  - [`domoskills update`](#domoskills-update)
- [The `SKILL.md` Specification](#the-skillmd-specification)
  - [YAML Frontmatter Schema](#yaml-frontmatter-schema)
  - [Recommended Markdown Structure](#recommended-markdown-structure)
- [Security Model & Auditing](#security-model--auditing)
  - [The 4 Core Security Pillars](#the-4-core-security-pillars)
  - [100-Point Security Score & Trust Levels](#100-point-security-score--trust-levels)
  - [Prohibited & Flagged AST Patterns](#prohibited--flagged-ast-patterns)
- [Web Platform & Discovery Engine](#web-platform--discovery-engine)
- [Curated Starter Packs](#curated-starter-packs)
- [`domoskills.json` Lockfile](#domoskillsjson-lockfile)
- [Local Development](#local-development)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

### 1. Discover Skills
Explore the open web registry at `http://localhost:3000/explore` or search from your terminal:

```bash
npx domoskills search react
npx domoskills search security
```

### 2. Add Skills to Your Project
Install single or multiple skills:

```bash
# Universal standard (default)
npx domoskills add react-performance owasp-agent-guardian

# Target a specific AI coding agent
npx domoskills add nextjs-app-router --agent claude
npx domoskills add fastapi-clean-architecture --agent cursor
npx domoskills add rag-pipeline-architect --agent opencode
```

### 3. Initialize & Diagnose Workspace
```bash
npx domoskills init
npx domoskills doctor
npx domoskills audit
npx domoskills list
```

---

## Key Features

- ⚡ **1,000+ Production-Ready Skills**: Spanning 12 engineering categories—Frontend, UI/UX/Design, Backend, Fullstack, Security, DevOps, Cloud, AI/ML, Database, Testing, Mobile, and Developer Productivity.
- 🔌 **Universal Multi-Agent Adapter Engine**: Native zero-configuration target directory mappings for 7 major AI environments: Universal Standard, Anthropic Claude Code, OpenAI Codex, Cursor IDE, OpenCode Interpreter, GitHub Copilot, and Google Antigravity / Gemini CLI.
- 🛡️ **Zero-Execution AST Security Engine**: Static pattern analyzer checks every skill against OWASP guidelines, detecting destructive commands (`rm -rf /`), shell pipes (`curl | bash`), reverse shells, encoded PowerShell, and exposed secret keys.
- 🔒 **Path Traversal Protection**: Hardened path normalization preventing `../` directory escapes and absolute path injections.
- 📦 **Reproducible Skill Lockfile (`domoskills.json`)**: Commit your team's AI capability dependencies to version control. Teammates run `npx domoskills install` to get identical agent behaviors.
- 🧰 **Full-Featured Developer CLI**: 9 commands (`init`, `search`, `add`, `install`, `remove`, `list`, `doctor`, `audit`, `update`) built with Commander and chalk for fast, scriptable workflows.
- 🌐 **Modern Web Discovery Portal (`apps/web`)**: Next.js 14 App Router web platform featuring:
  - **Instant Search & Multi-Faceted Filtering**: Filter by category, target agent, security tier, and sort by popularity, rating, or score.
  - **Density View Modes**: Toggle seamlessly between Card Grid, Compact Data Table, and List views.
  - **Side-by-Side Skill Comparator**: Compare up to 4 skills simultaneously on file size, security score, author, license, and trigger words.
  - **Interactive Skill Stack Cart**: Add skills to a temporary drawer with a fly-to-cart micro-interaction, curating custom compound installation commands.
  - **Global Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant keyboard navigation across registry catalogs and platform tools.
  - **Interactive Terminal Simulator**: Live web terminal demonstrating CLI operations with copyable commands and realistic shell responses.
  - **Web Agent Doctor (`/doctor`)**: Interactive browser health check scanning installed agent directories and environment variables.
  - **Community Submission Studio (`/submit`)**: Visual `SKILL.md` authoring studio with real-time YAML frontmatter linting and AST security pre-flight checks.
  - **Sound Effects & UI Motion**: Optional tactile Web Audio feedback on actions, animated Domo mascot, and wavy marquee displays.

---

## Architecture

DomoSkills is organized as a high-performance Turborepo monorepo:

```text
domoskills/
├── apps/
│   └── web/                   # Next.js 14 App Router web platform & registry UI
├── packages/
│   ├── cli/                   # Executable `domoskills` CLI installer
│   ├── registry/              # Search engine, seed database, and ingestion providers
│   ├── skill-parser/          # SKILL.md YAML frontmatter parser & AST security scanner
│   ├── validators/            # Zod schemas for skills, manifests, and submissions
│   └── adapters/              # Multi-agent directory mappings and command generators
├── scripts/
│   ├── build-1000-catalog.js  # Catalog generator & metadata validator
│   └── expand-skills.js       # Capability expansion script
├── package.json
├── turbo.json
└── README.md
```

### Package Descriptions

- **`@domoskills/cli`**: The command-line client published as `domoskills` (invocable via `npx domoskills`). Handles file downloads, lockfile generation, security auditing, and environment doctor checks.
- **`@domoskills/registry`**: In-memory search indexing, category trees, scoring algorithms, and curated skill metadata containing over 1,000 production skills.
- **`@domoskills/skill-parser`**: Parses `SKILL.md` files with YAML frontmatter delimiters, extracts metadata, validates AST nodes, and runs security regex heuristics.
- **`@domoskills/validators`**: Type-safe Zod schemas for skill manifests, frontmatter definitions, trust levels, and user submissions.
- **`@domoskills/adapters`**: Filesystem routing and configuration markers for 7 different AI coding assistants and agent runtimes.
- **`apps/web`**: Production web application built with Next.js 14, Tailwind CSS, Lucide icons, Zustand state management, and Framer Motion.

---

## Supported Agent Target Ecosystems

DomoSkills provides an adapter layer supporting all modern AI coding agents:

| Agent Target | Flag | Installation Path | Configuration Marker | Auto-Discovery | Global User Path |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Universal Standard** | `--agent universal` | `.agent/skills/` | `.agent/agent.yaml` | Yes | `~/.agent/skills` |
| **Claude Code** | `--agent claude` | `.claude/skills/` | `.claude/config.json` | Yes | `~/.claude/skills` |
| **OpenAI Codex / Agents** | `--agent codex` | `.agents/skills/` | `.agents/manifest.json` | Yes | `~/.agents/skills` |
| **Cursor IDE** | `--agent cursor` | `.cursor/skills/` | `.cursorrules` | Yes | `~/.cursor/skills` |
| **OpenCode Interpreter** | `--agent opencode` | `.opencode/skills/` | `.opencode/opencode.json` | Yes | `~/.opencode/skills` |
| **GitHub Copilot** | `--agent copilot` | `.github/skills/` | `.github/copilot-instructions.md` | Yes | `~/.github/skills` |
| **Gemini CLI / Antigravity** | `--agent gemini` | `.gemini/skills/` | `.gemini/config/skills` | Yes | `~/.gemini/skills` |

### How Agent Resolution Works
When you pass `--agent <target>`:
1. DomoSkills determines the designated target directory (e.g. `.cursor/skills/` or `.claude/skills/`).
2. It verifies the destination directory and checks for configuration hooks.
3. The skill package and its `SKILL.md` instruction file are extracted into `<agent_dir>/<skill-name>/`.
4. The local `domoskills.json` lockfile is updated with the installed skill, checksum, and target agent.

---

## CLI Command Reference

The `domoskills` CLI is fully executable with `npx domoskills` or after installing globally (`npm install -g domoskills`).

### `domoskills init`
Initialize a `domoskills.json` configuration file in the current directory.

```bash
# Initialize with default universal target
npx domoskills init

# Initialize with a specific agent target
npx domoskills init --agent cursor
npx domoskills init --agent claude --force
```

**Options:**
- `-a, --agent <target>`: Target agent ecosystem (`universal`, `claude`, `codex`, `cursor`, `opencode`, `copilot`, `gemini`). Default: `universal`.
- `-f, --force`: Overwrite existing configuration.

---

### `domoskills search`
Search skills in the open registry directly from your terminal.

```bash
# Search by keyword
npx domoskills search react

# Filter by category or agent compatibility
npx domoskills search graphql --category backend
npx domoskills search testing --agent cursor
```

**Options:**
- `-c, --category <category>`: Filter results by category slug (`frontend`, `backend`, `security`, `ai-ml`, etc.).
- `-a, --agent <agent>`: Filter by agent compatibility.

---

### `domoskills add`
Add one or more agent skills to your project or global user profile.

```bash
# Install single skill
npx domoskills add react-performance

# Install multiple skills simultaneously
npx domoskills add nextjs-app-router tailwind-design-system --agent cursor

# Install globally in your user home directory
npx domoskills add owasp-agent-guardian --global

# Force re-installation
npx domoskills add fastapi-clean-architecture --force
```

**Options:**
- `-a, --agent <target>`: Target agent ecosystem.
- `-g, --global`: Install globally into `~/<agent>/skills`.
- `-f, --force`: Force re-installation even if already present.

---

### `domoskills install`
Install all skills declared in your `domoskills.json` lockfile. Ideal for CI/CD pipelines and newly cloned repositories.

```bash
# Install everything declared in domoskills.json
npx domoskills install

# Force overwrite existing files
npx domoskills install --force
```

**Options:**
- `-a, --agent <target>`: Override target agent ecosystem.
- `-f, --force`: Force overwrite existing skills.

---

### `domoskills remove`
Safely remove an installed skill from the project workspace and update the lockfile.

```bash
npx domoskills remove react-performance
npx domoskills rm nextjs-app-router --agent cursor
```

**Options:**
- `-a, --agent <target>`: Target agent ecosystem.

---

### `domoskills list`
Display all skills currently installed in your active workspace or agent folder.

```bash
npx domoskills list
npx domoskills ls --agent claude
```

---

### `domoskills doctor`
Inspect your local environment, Node.js version, Git repository root, and detect active AI agent configurations (`.cursor`, `.claude`, `.agent`, `.gemini`, etc.).

```bash
npx domoskills doctor
```

Provides a diagnostic health checklist with actionable repair suggestions for any missing markers.

---

### `domoskills audit`
Perform a local AST security audit on all installed skills in your project, scanning for quarantined scripts, unsafe patterns, or security advisories.

```bash
npx domoskills audit
npx domoskills audit --agent cursor
```

---

### `domoskills update`
Check the remote registry and update installed skills to their latest verified versions.

```bash
# Update a specific skill
npx domoskills update react-performance

# Update all installed skills
npx domoskills update
```

---

## The `SKILL.md` Specification

Every DomoSkills package contains a canonical `SKILL.md` file that encapsulates capability instructions, operational guidelines, constraints, and trigger words for AI agents.

### YAML Frontmatter Schema

Each `SKILL.md` must begin with YAML frontmatter bounded by `---`:

```yaml
---
name: owasp-agent-guardian
description: Enforces OWASP Top 10 security standards, input sanitization, and dependency hardening for AI coding tasks.
version: 1.2.0
license: Apache-2.0
author: domoskills
compatibility:
  - universal
  - claude
  - cursor
  - gemini
  - codex
tags:
  - security
  - owasp
  - hardening
  - authentication
requiresEnv: []
dependencies: []
---
```

#### Supported Fields

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `name` | `string` | **Yes** | Unique hyphenated skill identifier (e.g. `react-performance`). |
| `description` | `string` | **Yes** | Concise summary of what capability this skill teaches the agent. |
| `version` | `string` | **Yes** | Semantic version number (`1.0.0`). |
| `license` | `string` | **Yes** | SPDX license identifier (`MIT`, `Apache-2.0`, `BSD-3-Clause`). |
| `author` | `string` | No | Author or organization handle. |
| `compatibility` | `string[]` | No | List of compatible agent targets (`universal`, `claude`, `cursor`, etc.). |
| `tags` | `string[]` | No | Searchable keywords and capability categories. |
| `dependencies` | `string[]` | No | Sub-skills or packages this skill depends upon. |
| `requiresEnv` | `string[]` | No | Environment variables the skill may reference (audited during scan). |

---

### Recommended Markdown Structure

To ensure maximum retention and adherence by AI agents, structure your skill markdown as follows:

```markdown
# Skill Name

## When to Trigger
Specify precise keywords, file patterns, or developer prompts that activate this skill:
- When writing SQL queries, authentication middleware, or API routes.
- Files matching `*.controller.ts`, `auth/*.ts`, or `api/**/*.py`.

## Core Guidelines & Best Practices
Provide concrete, prescriptive rules that the agent must adhere to:
1. Always validate incoming request payloads with Zod or Pydantic.
2. Use parameterized queries exclusively; forbid string concatenation in database calls.
3. Keep tokens out of version control and read from validated environment variables.

## Anti-Patterns & Pitfalls
Explicitly highlight what the AI coding agent must NEVER do:
- ❌ Do NOT use `eval()` or dangerous deserialization primitives.
- ❌ Do NOT bypass CSRF protection or disable CORS headers in production.

## Concrete Code Examples
Provide clear before/after code blocks demonstrating the desired implementation pattern.
```

---

## Security Model & Auditing

AI coding assistants have elevated access to developers' file systems and terminals. DomoSkills treats security as a first-class citizen with multiple layers of defense:

### The 4 Core Security Pillars

1. **Zero Automatic Execution**: DomoSkills will **NEVER** execute arbitrary scripts or binaries downloaded from remote repositories during installation. Skills are purely declarative knowledge files and references.
2. **Path Traversal Guard**: Every file in a package is validated with strict path normalization. Null bytes (`\0`), absolute path segments (`/var`, `C:\`), and parent directory traversals (`../`) are instantly rejected.
3. **Quarantine & Auditing**: Compiled binaries (`.exe`, `.dll`, `.bin`, `.so`) and executable scripts (`.sh`, `.bat`, `.py`) are automatically quarantined in read-only mode and flagged with warning badges in both the UI and CLI audit logs.
4. **Secret & Pattern Scanning**: AST-level static pattern matching scans skill markdown and companion files for hardcoded API credentials, private cryptographic keys, malicious pipes, and destructive shell commands.

---

### 100-Point Security Score & Trust Levels

Every skill is evaluated and assigned an objective security score:

- **100 / 100**: Baseline score for verified declarative Markdown instructions with valid metadata, validated licensing, and zero script presence.
- **-10 Points**: Presence of executable script files (`.sh`, `.bash`, `.py`, `.bat`).
- **-25 to -30 Points**: Suspicious shell patterns or credential structures detected in text.
- **-40 Points**: Binary file artifacts (`.bin`, `.so`, `.dylib`, `.exe`).
- **-50 Points**: Forbidden path characters or attempted traversal escapes.

#### Trust Tiers

| Trust Tier | Badge Color | Criteria |
| :--- | :--- | :--- |
| **Official** | Purple / Cyan | Curated and maintained directly by the DomoSkills core team. |
| **Verified** | Emerald Green | Verified publisher, Security Score $\ge$ 80, no executable script files. |
| **Community** | Blue | Community contributed, Security Score $\ge$ 60, clean AST scan. |
| **Experimental** | Amber / Red | Security Score < 60 or unreviewed community submission. |

---

### Prohibited & Flagged AST Patterns

The parser flags the following dangerous patterns during registry ingestion and local auditing:

- **Shell Pipes**: `curl ... | bash` or `wget ... | sh`
- **Destructive Deletion**: `rm -rf /` or `rm -rf ~` or `rm -rf $HOME`
- **Reverse Shells**: Netcat reverse shell calls (`nc -e /bin/sh`)
- **Encoded Commands**: Encoded PowerShell payloads (`powershell -e ...`)
- **Hardcoded Secrets**: GitHub tokens (`ghp_...`), Slack tokens (`xoxb-...`), AWS keys (`AKIA...`)
- **Private Keys**: `-----BEGIN PRIVATE KEY-----` or `-----BEGIN RSA PRIVATE KEY-----`
- **Obfuscated Code**: `eval(base64_decode(...))`

---

## Web Platform & Discovery Engine

The DomoSkills web application (`apps/web`) provides a rich, responsive interface for browsing, comparing, and configuring skills:

- **Explore Page (`/explore`)**:
  - Filter across 12 tech domains (Frontend, Backend, Security, DevOps, Cloud, AI/ML, etc.).
  - Search by title, tag, author, or description in milliseconds.
  - Multi-agent compatibility selector (Universal, Claude Code, Cursor, Codex, Copilot, Antigravity, OpenCode).
  - Density switch: Card Grid mode, Compact Table mode, or List mode.
  - Sort by Popularity, Rating, Security Score, or Alphabetical order.
- **Skill Detail Page (`/skills/[slug]`)**:
  - Full rendered markdown view of the skill's instructions.
  - Interactive AST Security Scorecard with itemized criteria and warning reports.
  - One-click copy installation commands for all 7 supported AI agents.
  - File tree browser showing companion reference files.
- **Skill Comparator Drawer**:
  - Compare up to 4 skills side-by-side.
  - View comparative metrics: security scores, repository stars, file counts, license types, and trigger keywords.
- **Skill Stack Cart**:
  - Collect skills as you browse with animated fly-to-cart micro-interactions.
  - Generate a single compound terminal command to install your entire stack at once:
    ```bash
    npx domoskills add react-performance tailwind-tokens owasp-agent-guardian --agent cursor
    ```
  - Export your stack directly to `domoskills.json`.
- **Environment Doctor (`/doctor`)**:
  - Web diagnostic interface verifying local agent configurations and markers.
- **Skill Submission Studio (`/submit`)**:
  - In-browser markdown and frontmatter editor with live validation against Zod schemas.
  - Pre-flight security scoring before submitting to the open registry.
- **Command Palette (`Cmd+K` / `Ctrl+K`)**:
  - Instant modal for fuzzy searching the catalog, jumping between pages, and executing platform actions.

---

## Curated Starter Packs

DomoSkills includes pre-configured capability stacks for common engineering initiatives:

### 🛡️ The OWASP Security Guardian Stack
```bash
npx domoskills add owasp-agent-guardian secure-auth-patterns secrets-hardening --agent universal
```
Arm your AI assistant with OWASP Top 10 rules, JWT/session security best practices, and zero-leakage secret handling.

### ⚛️ The Next.js 14 & React Performance Stack
```bash
npx domoskills add nextjs-app-router react-performance tailwind-design-system --agent cursor
```
Equip Cursor or Claude with deep knowledge of React Server Components, hydration optimization, and design tokens.

### 🐍 Python Clean Architecture & FastAPI Stack
```bash
npx domoskills add fastapi-clean-architecture pydantic-v2-patterns pytest-asyncio-suite --agent claude
```
Enforce strict domain-driven design, Pydantic v2 data validation, and asynchronous testing patterns.

### 🤖 AI Agent & RAG Pipeline Stack
```bash
npx domoskills add rag-pipeline-architect vector-db-optimizer llm-prompt-evaluator --agent opencode
```
Optimize hybrid search retrieval, chunking strategies, embeddings, and automated prompt evaluation harnesses.

---

## `domoskills.json` Lockfile

When installing skills, DomoSkills automatically creates or updates a reproducible `domoskills.json` lockfile in your project root:

```json
{
  "version": 1,
  "agent": "universal",
  "skills": [
    {
      "name": "react-performance",
      "source": "domoskills/official-agent-skills",
      "version": "1.4.2",
      "commit": "7f9a12c",
      "installedAt": "2026-08-30T12:00:00.000Z"
    },
    {
      "name": "owasp-agent-guardian",
      "source": "domoskills/official-agent-skills",
      "version": "1.2.0",
      "commit": "b3e412f",
      "installedAt": "2026-08-30T12:00:05.000Z"
    }
  ]
}
```

Reproduce your entire capability stack on any developer machine or CI container:

```bash
npx domoskills install
```

---

## Local Development

DomoSkills uses [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/) to manage packages and dependencies.

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Step-by-Step Setup

```bash
# Clone the repository
git clone https://github.com/darknecrocities/DomoSkills.git
cd DomoSkills

# Install all workspace dependencies
pnpm install

# Build all packages & web application
pnpm build

# Run unit and integration tests across all packages
pnpm test

# Launch web dev server (http://localhost:3000)
pnpm dev
```

### Useful Monorepo Commands

| Command | Description |
| :--- | :--- |
| `pnpm build` | Compiles TypeScript for all 5 packages and creates the Next.js production build. |
| `pnpm test` | Runs Vitest across `@domoskills/adapters`, `@domoskills/registry`, `@domoskills/skill-parser`, and `@domoskills/validators`. |
| `pnpm dev` | Starts the Next.js development server with hot reloading. |
| `pnpm lint` | Runs Next.js ESLint checks across the codebase. |

---

## Contributing

Contributions from the developer and AI agent communities are warmly welcomed!

1. **Fork the Repository**: Create a personal fork on GitHub.
2. **Create a Feature Branch**: `git checkout -b feat/my-new-skill-or-feature`.
3. **Write Tests**: Add Vitest test cases for any new parsers, adapters, or validators.
4. **Verify Standards**: Ensure `pnpm build` and `pnpm test` pass with zero errors.
5. **Submit a Pull Request**: Provide a concise summary of the changes and any new skills introduced.

### Submitting a New Skill
You can submit a skill via pull request in `packages/registry/src/data/skills.json` or by using the visual submission portal at `http://localhost:3000/submit`.

Ensure your `SKILL.md`:
- Contains valid YAML frontmatter conforming to `@domoskills/validators`.
- Has an open-source license (MIT, Apache-2.0, BSD-3-Clause).
- Scores $\ge 80$ on the AST security scanner.
- Contains clear trigger conditions and actionable best practices.

---

## License

Licensed under the [MIT License](LICENSE).

Curated skills preserve their original open-source repository licenses (MIT, Apache-2.0, BSD).
