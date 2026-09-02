// scripts/generators/security.js
// Exhaustive, original, high-accuracy skills for Cybersecurity & DevSecOps

module.exports = {
  'dependency-vulnerability-audit': `---
name: dependency-vulnerability-audit
description: Automated software supply chain security, SBOM generation with Syft, Trivy CVE scanning, lockfile integrity audits, and provenance verification.
license: MIT
version: 1.0.0
---

# Software Supply Chain Security & Dependency Vulnerability Audit

## Overview
Modern software applications are composed of up to 90% open-source dependencies. Software supply chain attacks exploit unpatched CVEs, compromised transitive dependencies, typosquatting, and dependency confusion. This skill establishes an automated, multi-layered security defense across the entire dependency lifecycle:
1. **Software Bill of Materials (SBOM)**: Machine-readable inventory (CycloneDX 1.5, SPDX 2.3).
2. **Vulnerability Scanning**: Continuous automated audit against the National Vulnerability Database (NVD) and GitHub Advisory Database (GHSA).
3. **Lockfile Integrity Enforcement**: Cryptographic hash validation preventing tampered artifacts.
4. **Automated CI Gating**: Blocking builds that introduce High or Critical severity CVEs without approved exceptions.

## 1. SBOM Generation & Analysis Pipeline
Generate comprehensive software bill of materials using Syft across source directories and container images:

\`\`\`bash
# Generate CycloneDX JSON SBOM for local workspace
syft dir:. -o cyclonedx-json=workspace-sbom.json

# Scan container image and export SPDX format
syft ghcr.io/enterprise/service:latest -o spdx-json=image-sbom.spdx.json

# Validate SBOM conformance and list license distribution
syft dir:. --select-catalogers javascript,python,golang
\`\`\`

## 2. Multi-Ecosystem Lockfile Audit Automation

### Node.js / TypeScript (pnpm & npm)
\`\`\`bash
# Audit dependencies with high-severity exit code threshold
pnpm audit --audit-level=high

# Resolve transitive vulnerabilities via pnpm overrides in package.json
# Example snippet in package.json:
# "pnpm": {
#   "overrides": {
#     "tar@<6.2.1": ">=6.2.1",
#     "semver@<7.5.2": ">=7.5.2"
#   }
# }
\`\`\`

### Python (pip-audit)
\`\`\`bash
# Install and run pip-audit against lockfile or virtual environment
pip install pip-audit
pip-audit -r requirements.txt --strict --desc
\`\`\`

### Go & Rust
\`\`\`bash
# Go vulnerability check
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...

# Rust cargo audit
cargo install cargo-audit
cargo audit
\`\`\`

## 3. Comprehensive Trivy Scanner Integration in GitHub Actions
\`\`\`yaml
name: Dependency & Container Security Gate

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  security-audit:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write

    steps:
      - name: Checkout Source
        uses: actions/checkout@v4

      - name: Generate CycloneDX SBOM
        uses: anchore/sbom-action@v0
        with:
          format: cyclonedx-json
          output-file: sbom.cyclonedx.json

      - name: Run Trivy Vulnerability Scanner on SBOM
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'sbom'
          input: 'sbom.cyclonedx.json'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1' # Fails build on Critical or High vulnerabilities

      - name: Upload Scan Results to GitHub Security Tab
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'
\`\`\`

## 4. Remediation & Vulnerability Triage Protocol
When a CVE is detected by the scanner:
1. **Identify blast radius**: Determine if the vulnerable code path is actually imported and executed in production (using static call graph analysis or reachability tools).
2. **Direct dependency upgrade**: Check if a semver-compatible patch version exists. Upgrade immediately if non-breaking.
3. **Transitive dependency resolution**: Apply package manager override pins (\`resolutions\` in Yarn, \`overrides\` in npm/pnpm).
4. **Zero-Day mitigation**: If no upstream fix exists, apply runtime application self-protection (RASP), virtual patching via WAF rules, or wrap the vulnerable function in defensive input sanitizers.

## 5. Security Anti-Patterns
- ❌ **Using \`npm install\` in CI without frozen lockfiles**: Always use \`pnpm install --frozen-lockfile\` or \`npm ci\`. Unfrozen installs can pull unverified upstream releases.
- ❌ **Ignoring transitive dependencies**: Over 70% of supply chain breaches originate from dependencies-of-dependencies.
- ❌ **Permitting wildcard semantic versions (\`*\` or \`latest\`)**: Every dependency in \`package.json\` or \`requirements.txt\` must specify exact or caret-bounded semantic ranges.
`,

  'jwt-oauth2-pki-guardian': `---
name: jwt-oauth2-pki-guardian
description: Secure JWT authentication, OAuth2 PKCE token exchange, RS256/EdDSA asymmetric signature verification, and key rotation.
license: MIT
version: 1.1.0
---

# JWT, OAuth 2.1 & PKI Asymmetric Authentication

## Overview
JSON Web Tokens (JWT) and OAuth 2.1 form the backbone of modern identity and authorization. Misconfigurations (such as the \`"none"\` algorithm vulnerability, symmetric key confusion, token storage in \`localStorage\`, or missing audience verification) lead to catastrophic authentication bypasses.

## 1. Asymmetric Token Verification (RS256 / EdDSA via JWKS)
Never hardcode symmetric HMAC secrets for microservice architectures. Use asymmetric key pairs where identity providers sign tokens with private keys and resource servers verify tokens using public JSON Web Key Sets (JWKS).

\`\`\`typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

// 1. Configure remote JWKS client with automatic key rotation and caching
const JWKS_URI = new URL('https://auth.enterprise.io/.well-known/jwks.json');
const JWKS = createRemoteJWKSet(JWKS_URI, {
  cacheMaxAge: 600_000, // 10 minutes cache
  cooldownDuration: 30_000, // 30 seconds rate-limit on key refresh
});

export interface TokenClaims {
  sub: string;
  email: string;
  roles: string[];
  tenant_id: string;
}

export async function verifyAccessToken(token: string): Promise<TokenClaims> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: 'https://auth.enterprise.io/',
    audience: 'https://api.enterprise.io/v1',
    algorithms: ['RS256', 'EdDSA'], // Explicitly whitelist allowed algorithms
  });

  // Verify mandatory claims
  if (!payload.sub || typeof payload.sub !== 'string') {
    throw new Error('Token verification failed: Missing subject claim.');
  }

  return {
    sub: payload.sub,
    email: payload.email as string,
    roles: (payload.roles as string[]) || [],
    tenant_id: payload.tenant_id as string,
  };
}
\`\`\`

## 2. OAuth 2.1 PKCE (Proof Key for Code Exchange)
Public clients (Single Page Apps, mobile apps) must never use the deprecated Implicit Flow. Always enforce Authorization Code Flow with PKCE:

\`\`\`typescript
// Client-side PKCE code challenge generator
export async function generatePKCE() {
  const verifier = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');

  return { verifier, challenge };
}
\`\`\`

## 3. Storage Invariants
- ❌ **Never store JWT access tokens in \`localStorage\` or \`sessionStorage\`**: Any Cross-Site Scripting (XSS) vulnerability can exfiltrate tokens immediately.
- ✅ **Store tokens in \`HttpOnly\`, \`Secure\`, \`SameSite=Lax\` cookies** or in an in-memory variable managed by a Web Worker.
`
};
