#!/usr/bin/env python3
"""
apply_superpower_overrides.py

Applies canonical, high-fidelity technical instructions for the iconic
superpower and agent development workflows.
"""

import json
import os

SKILLS_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../packages/registry/src/data/skills.json')
)

SUPERPOWER_OVERRIDES = {
    'systematic-debugging': """---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
license: MIT
version: 1.0.0
---

# Systematic Debugging Protocol

## Overview
When encountering any bug, test failure, or unexpected system behavior, NEVER guess or apply speculative fixes. Adhere strictly to this 4-Phase Systematic Debugging Protocol before proposing or modifying any code.

---

## 1. Phase 1: Root Cause Investigation
1. **Reproduce Reliably**: Create a minimal reproducing test case or exact CLI command demonstrating the failure.
2. **Trace the Data Flow**: Follow inputs from system boundaries to the point of failure. Inspect intermediate values and execution paths.
3. **Form a Falsifiable Hypothesis**: State precisely what you believe is wrong: "Variable X has value Y at line Z because condition W evaluated false".
4. **Test the Hypothesis Before Editing**: Run diagnostics, add temporary assertions or targeted logging to confirm the hypothesis with evidence before writing a fix.

---

## 2. Phase 2: Pattern Analysis & Scope Assessment
- Search for the same pattern across the codebase: "Does this bug exist in sibling modules, adapters, or serializers?"
- Review git blame and commit history on the failing lines to understand original author intent and recent drift.
- Check edge cases: null/undefined, empty arrays, unicode strings, network timeouts, and concurrency races.

---

## 3. Phase 3: Minimal Surgical Remediation
- Formulate the smallest possible patch that restores correctness without collateral side-effects.
- Preserve existing public API signatures and contracts unless breaking changes are explicitly requested.
- Never suppress errors with empty catch blocks or unsafe type casts.

---

## 4. Phase 4: Regression Prevention & Verification
- Run the reproduction test to prove the bug is eliminated.
- Run the entire test suite to guarantee zero regressions.
- Commit the test alongside the fix so the bug can never re-occur.
""",

    'test-driven-development': """---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code
license: MIT
version: 1.0.0
---

# Test-Driven Development (TDD) Standard

## The Iron Law of TDD
**Never write production implementation code without a failing test demonstrating the need for that code.**

---

## 1. The Red-Green-Refactor Cycle

### Step 1: RED (Write a Failing Test)
- Create a test file (*.test.ts or test_*.py) targeting the desired capability.
- Express expected behavior through crisp assertions on public interfaces.
- Run the test suite and verify the test fails for the expected reason (not due to syntax or import error).

### Step 2: GREEN (Write Minimal Passing Code)
- Write the simplest possible implementation that satisfies the test assertions.
- Do not write anticipatory abstractions or unneeded helper methods.
- Run the test suite and verify all tests pass.

### Step 3: REFACTOR (Clean and Harden)
- Eliminate duplication, improve naming, and adhere to SOLID principles.
- Run the test suite continuously to guarantee zero regressions during cleanup.

---

## 2. Test Isolation & Quality Standards
- Tests must be deterministic, fast, and order-independent.
- Mock external I/O (network, third-party APIs, disk) at system boundaries using typed test doubles.
- Avoid testing private implementation details; test public observable behaviors and invariants.
""",

    'verification-before-completion': """---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs
license: MIT
version: 1.0.0
---

# Verification Before Completion: Evidence Before Assertion

## Core Invariant
**Never claim a task is complete, a bug is fixed, or tests pass without direct command execution output proving the claim.**

---

## 1. The 5-Step Verification Gate
1. **Fresh Build Verification**: Execute `npm run build` or project build command. Confirm exit code 0 and zero compilation errors.
2. **Static Typecheck**: Run `tsc --noEmit` or language typechecker. Confirm 0 type errors.
3. **Linter & Formatting**: Run `npm run lint`. Confirm zero lint warnings or errors.
4. **Test Suite Execution**: Run test commands (`npm test`). Review assertion counts and confirm all suites pass.
5. **Git Diff Audit**: Inspect `git status` and `git diff`. Verify only intended files were modified with no stray scratch files or debug logs left behind.

---

## 2. Success Criteria Checklist
- [ ] Direct terminal command output confirms success.
- [ ] Edge cases verified with affirmative evidence.
- [ ] No temporary comments or debug prints (`console.log`, `debugger`) remain in codebase.
- [ ] All documentation and type definitions updated in sync with code changes.
""",

    'writing-plans': """---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
license: MIT
version: 1.0.0
---

# Implementation Plan Architecture

## Overview
Before modifying code on any non-trivial task, formulate a comprehensive, step-by-step implementation plan.

---

## Plan Structure
1. **Goal Statement**: Crisp 1-2 sentence description of what will be achieved.
2. **Proposed Architecture & Invariants**: High-level design decisions, contracts, and schema boundaries.
3. **Step-by-Step Task Breakdown**:
   - Each task must be bite-sized and independently testable (<= 30 minutes of work).
   - Specify target files, functions, and expected interfaces.
   - Include specific verification command for each task.
4. **Risk & Mitigation Matrix**: Known hazards (breaking changes, migration ordering, third-party downtime) and rollback procedures.
5. **Review Checkpoints**: Explicit stages where human review or subagent verification is required.
""",

    'using-git-worktrees': """---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans
license: MIT
version: 1.0.0
---

# Git Worktree Workspace Isolation

## Purpose
Isolate feature development and long-running refactors into dedicated filesystem worktrees without polluting your active branch or unstaged working changes.

---

## Standard Operating Procedure

### 1. Create Isolated Worktree
```bash
git worktree add -b feature/<name> ../<workspace-name>-<name> main
cd ../<workspace-name>-<name>
npm install
```

### 2. Execute Work & Verify
- Implement features, run tests, and commit atomically within the isolated worktree directory.

### 3. Merge & Clean Up
```bash
cd <original-workspace>
git merge feature/<name>
git worktree remove ../<workspace-name>-<name>
git branch -d feature/<name>
```
""",

    'unslop': """---
name: unslop
description: Edit text to remove AI patterns and restore human voice: cut puffery, restore clarity
license: MIT
version: 1.0.0
---

# Unslop: Technical Writing & Voice Restoration

## Purpose
Eliminate artificial, verbose, and clichéd AI writing patterns. Restore crisp, high-signal, human technical communication.

---

## The AI Cliché Banlist
- ❌ **Forbidden Verbs & Nouns**: *delve, testament, tapestry, pivotal, seamless, comprehensive, robust, leverage, revolutionize, foster, holistic, landscape, synergy*.
- ❌ **Forbidden Openers**: *"In today's fast-paced digital world...", "It's important to remember...", "Whether you are a seasoned developer or..."*.
- ❌ **Forbidden Closers**: *"In conclusion, by embracing this paradigm, you will unlock unprecedented..."*.

---

## The 4 Principles of Clean Technical Voice
1. **Lead with the Verb**: State actions directly. Instead of *"We have the ability to utilize X for the achievement of Y"*, write *"Use X to do Y"*.
2. **Cut Adverbs and Empty Modifiers**: Delete *very, highly, extremely, completely, fundamentally*. If a word doesn't change the engineering meaning, remove it.
3. **Use Concrete Numbers**: Replace *"blazing fast speed"* with *"sub-5ms response time at p99"*.
4. **Active Voice Always**: Replace *"Files are processed by the worker"* with *"The worker processes files"*.
""",

    'create-design-md': """---
name: create-design-md
description: Create or update a DESIGN.md from a product repo or public site—document the governing design language, tokens, and guidance without copying every implementation detail.
license: MIT
version: 1.0.0
---

# DESIGN.md Generation & Brand Extraction

## Purpose
Extract and codify the governing design language, color tokens, typography hierarchy, elevation, and component contracts of a product into a definitive `DESIGN.md`.

---

## Standard DESIGN.md Structure

### 1. Atmosphere & Brand Philosophy
- Define the visual mood: e.g. *Developer-native industrial minimalism with high-contrast monochrome surfaces and precision border strokes*.

### 2. Color System & Semantic Roles
- **Canvas / Background**: `--bg-canvas`, `--bg-surface`, `--bg-surface-raised`
- **Borders & Dividers**: `--border-subtle`, `--border-default`, `--border-bright`
- **Typography**: Primary white, secondary zinc-400, muted zinc-500
- **Accent Signals**: Emerald green (online/success), amber (warning), red (error)

### 3. Typographic Hierarchy
- **Headings & Brand**: Monospaced font (`JetBrains Mono`, `Space Grotesk`) with uppercase tracking.
- **Body & Documentation**: Crisp sans-serif (`Inter`, `Plus Jakarta Sans`) with 1.6 line-height.

### 4. Component Patterns & Elevation
- Cards: Border strokes `1px solid var(--border-default)`, background blur, subtle box shadow on hover.
- Buttons: High-contrast white solid on dark backgrounds with snappy spring transition.
""",

    'shadcn': """---
name: shadcn
description: Reusable accessible UI components built with Radix UI and Tailwind CSS. Modern React component primitives.
license: MIT
version: 1.0.0
---

# shadcn/ui Component Architecture & Composition

## Purpose
Integrate, style, and compose copy-paste UI component primitives using Radix UI accessible unstyled primitives and Tailwind CSS utility classes.

---

## 1. Architectural Philosophy
- **Own Your Code**: Components live in your repository (`src/components/ui/`), not inside an opaque npm package.
- **Accessible By Default**: Built on Radix UI headless primitives with full keyboard navigation and screen reader support.
- **Variant Styling**: Utilize `class-variance-authority` (cva) and `clsx` + `tailwind-merge` (`cn` helper).

---

## 2. The Canonical `cn()` Helper
```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 3. Button Primitive Implementation with CVA
```tsx
// src/components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```
"""
}

with open(SKILLS_PATH, 'r', encoding='utf-8') as f:
    skills = json.load(f)

updated = 0
for s in skills:
    slug = s.get('slug')
    if slug in SUPERPOWER_OVERRIDES:
        content = SUPERPOWER_OVERRIDES[slug].strip()
        s['instructions'] = content
        if 'files' in s and isinstance(s['files'], list):
            for f in s['files']:
                if f.get('path') == 'SKILL.md':
                    f['content'] = content
                    f['size'] = len(content.encode('utf-8'))
        updated += 1

print(f"Applied authentic canonical overrides to {updated} skills.")

with open(SKILLS_PATH, 'w', encoding='utf-8') as f:
    json.dump(skills, f, indent=2, ensure_ascii=False)

print("Updated skills.json successfully.")
