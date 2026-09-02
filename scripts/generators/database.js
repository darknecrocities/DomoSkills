// scripts/generators/database.js
// Exhaustive, original, high-accuracy skills for Databases & ORMs

module.exports = {
  'supabase-rls-architect': `---
name: supabase-rls-architect
description: Enterprise PostgreSQL Row-Level Security (RLS), multi-tenant isolation policies, Supabase Auth claims, and bypass prevention.
license: MIT
version: 1.2.0
---

# Supabase PostgreSQL Row-Level Security (RLS) Architecture

## Overview
PostgreSQL Row-Level Security (RLS) restricts which rows can be selected, inserted, updated, or deleted based on the security context of the querying user. In Supabase, RLS is the single line of defense protecting customer data when querying tables directly from client-side SDKs.

## 1. Core Invariants
- **Always enable RLS explicitly**: Table creation does NOT enable RLS by default. Unprotected tables permit anyone with an \`anon\` API key to read and mutate all records.
- **Always force RLS on table owners**: Add \`FORCE ROW LEVEL SECURITY\` so table owners and migration roles cannot accidentally bypass policies.
- **Index every column referenced in RLS \`USING\` expressions**: Unindexed columns in RLS policies cause severe table-scan degradation on every query.

## 2. Production Multi-Tenant RLS Policy Matrix
\`\`\`sql
-- 1. Enable RLS on core tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations FORCE ROW LEVEL SECURITY;

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents FORCE ROW LEVEL SECURITY;

-- 2. Index foreign keys evaluated in policies
CREATE INDEX idx_documents_org_id ON documents (org_id);
CREATE INDEX idx_documents_created_by ON documents (created_by);

-- 3. SELECT Policy: Members can only read documents belonging to their active organization
CREATE POLICY "org_members_can_read_documents"
ON documents
FOR SELECT
TO authenticated
USING (
    org_id IN (
        SELECT organization_id 
        FROM organization_memberships
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

-- 4. INSERT Policy: Verify author matches auth.uid() and user has write role in organization
CREATE POLICY "org_writers_can_insert_documents"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
    created_by = auth.uid()
    AND org_id IN (
        SELECT organization_id 
        FROM organization_memberships
        WHERE user_id = auth.uid()
        AND role IN ('admin', 'editor')
    )
);

-- 5. UPDATE Policy: Authors can edit draft docs; Admins can edit any org doc
CREATE POLICY "authors_or_admins_can_update_documents"
ON documents
FOR UPDATE
TO authenticated
USING (
    (created_by = auth.uid() AND status = 'draft')
    OR org_id IN (
        SELECT organization_id 
        FROM organization_memberships
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
)
WITH CHECK (
    org_id IN (
        SELECT organization_id 
        FROM organization_memberships
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- 6. DELETE Policy: Strictly restricted to Organization Admins
CREATE POLICY "only_admins_can_delete_documents"
ON documents
FOR DELETE
TO authenticated
USING (
    org_id IN (
        SELECT organization_id 
        FROM organization_memberships
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);
\`\`\`

## 3. High-Performance Subquery Optimization with \`auth.jwt()\`
Avoid deep SQL subqueries inside RLS policies by storing organization IDs directly in Custom Claims via Supabase Auth hooks:

\`\`\`sql
-- Blazing fast RLS reading directly from pre-computed JWT claims
CREATE POLICY "fast_jwt_tenant_isolation"
ON documents
FOR SELECT
TO authenticated
USING (
    org_id = (auth.jwt() -> 'app_metadata' ->> 'org_id')::uuid
);
\`\`\`

## 4. RLS Anti-Patterns
- ❌ **Using \`service_role\` key in client apps**: The \`service_role\` key bypasses RLS completely. It must only ever be used in trusted server-side background workers.
- ❌ **Forgetting \`WITH CHECK\` on INSERT/UPDATE**: \`USING\` only filters existing rows. Without \`WITH CHECK\`, a user could update a row to assign it to another tenant!
- ❌ **Unindexed RLS subqueries**: Joining permission tables without indexes on \`user_id\` turns single-row lookups into multi-second table scans.
`,

  'drizzle-orm-master': `---
name: drizzle-orm-master
description: Type-safe TypeScript SQL ORM, schema declaration with relational queries, automated Drizzle Kit migrations, and zero-allocation joins.
license: MIT
version: 1.1.0
---

# Drizzle ORM Architecture & Production Patterns

## Overview
Drizzle ORM is a lightweight, type-safe TypeScript ORM that mirrors SQL semantics directly while delivering zero overhead and compile-time type safety. Unlike heavy ORMs with runtime query engines, Drizzle generates predictable, optimized SQL with full support for relational queries, transactions, and automated schema migrations.

## 1. Schema Declaration with Typed PostgreSQL Enums & Relations
\`\`\`typescript
import { pgTable, uuid, text, timestamp, boolean, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Database Enums
export const roleEnum = pgEnum('user_role', ['admin', 'developer', 'viewer']);
export const statusEnum = pgEnum('skill_status', ['draft', 'published', 'archived']);

// 2. Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  role: roleEnum('role').default('developer').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
}));

// 3. Skills Table with Foreign Key Relations
export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: statusEnum('status').default('draft').notNull(),
  downloads: integer('downloads').default(0).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('idx_skills_slug').on(table.slug),
  authorIdx: index('idx_skills_author_id').on(table.authorId),
}));

// 4. Relational Definitions
export const usersRelations = relations(users, ({ many }) => ({
  skills: many(skills),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  author: one(users, {
    fields: [skills.authorId],
    references: [users.id],
  }),
}));
\`\`\`

## 2. Transactions & Relational Querying
\`\`\`typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, desc, sql } from 'drizzle-orm';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Fetch skill with nested author relation in a single round-trip
export async function getSkillWithAuthor(slug: string) {
  return await db.query.skills.findFirst({
    where: eq(schema.skills.slug, slug),
    with: {
      author: {
        columns: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
}

// Atomic Transaction with Row Locking
export async function incrementDownloadCount(skillId: string) {
  return await db.transaction(async (tx) => {
    const updated = await tx
      .update(schema.skills)
      .set({
        downloads: sql\`\${schema.skills.downloads} + 1\`,
        updatedAt: new Date(),
      })
      .where(eq(schema.skills.id, skillId))
      .returning();

    return updated[0];
  });
}
\`\`\`

## 3. Migration Configuration (\`drizzle.config.ts\`)
\`\`\`typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
\`\`\`
`
};
