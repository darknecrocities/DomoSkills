'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Shield,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  EyeOff,
  Database,
  Terminal,
  FileCode,
  HardDrive,
  UserCheck,
} from 'lucide-react';

export default function PrivacyPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sections = [
    { id: 'commitment', title: '1. Our Privacy Commitment' },
    { id: 'zero-telemetry', title: '2. Zero Code & Prompt Telemetry' },
    { id: 'data-we-collect', title: '3. What Data We Collect & Why' },
    { id: 'local-storage', title: '4. Local-First Device Storage' },
    { id: 'third-party', title: '5. Third-Party Infrastructure' },
    { id: 'cookies', title: '6. Cookies & Tracking Technologies' },
    { id: 'data-retention', title: '7. Data Retention & Deletion Rights' },
    { id: 'security', title: '8. How We Protect Your Data' },
    { id: 'children', title: '9. Age Appropriateness' },
    { id: 'changes', title: '10. Policy Changes & Updates' },
    { id: 'contact', title: '11. Contact & Privacy Inquiries' },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-white hover:border-white transition"
              title="Copy link to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Page'}</span>
            </button>
            <Link
              href="/terms"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition"
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Terms of Service →</span>
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted mb-4">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Developer Privacy First • Transparent Policy</span>
          </div>
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="font-sans text-base text-text-secondary max-w-2xl leading-relaxed">
            DomoSkills is built for developers. We believe in strict data minimization, zero code telemetry,
            and total transparency about how our open registry and CLI tools handle information.
          </p>
          <div className="mt-4 flex items-center gap-4 font-mono text-xs text-text-muted">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Version: 1.0.0</span>
            <span>•</span>
            <span className="text-emerald-400">Strict Data Minimization</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <EyeOff className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Zero Code Telemetry</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              We never access, upload, or transmit your private source code, git commits, or project files.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <Shield className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>No Prompt Logging</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              We never capture or monitor the conversations between you and your AI coding assistants.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <HardDrive className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Local-First Caching</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              Skill carts, comparison picks, and view modes are stored strictly in your browser's local storage.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <UserCheck className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Optional Accounts</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              You can search, compare, and install all skills anonymously without creating an account.
            </p>
          </div>
        </div>

        {/* Main Content Layout with Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sticky Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-surface p-4 space-y-3 font-mono text-xs">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-border">
                On This Page
              </div>
              <nav className="space-y-1.5">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-text-muted hover:text-white transition truncate py-0.5"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="pt-3 border-t border-border">
                <Link
                  href="/terms"
                  className="text-cyan-400 hover:underline block text-[11px]"
                >
                  Read Terms of Service →
                </Link>
              </div>
            </div>
          </div>

          {/* Policy Text Sections */}
          <div className="lg:col-span-3 space-y-12 font-sans text-sm text-text-secondary leading-relaxed">
            
            {/* Section 1 */}
            <section id="commitment" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">1.</span> Our Privacy Commitment
              </h2>
              <p>
                DomoSkills provides an open registry and CLI utility for AI Agent Skills. We operate with a fundamental principle:
                <strong className="text-white"> your code belongs to you, and your developer environment is private.</strong>
              </p>
              <p>
                This Privacy Policy describes what information is collected when you browse our website, use the <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">domoskills</code> CLI, or interact with our community submission tools, and how that information is used.
              </p>
            </section>

            {/* Section 2 */}
            <section id="zero-telemetry" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Zero Code & Prompt Telemetry
              </h2>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
                <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>The DomoSkills Privacy Guarantee</span>
                </div>
                <ul className="list-disc list-inside space-y-2 font-sans text-xs text-text-secondary">
                  <li>
                    <strong className="text-white">No Source Code Transmission:</strong> Neither the website nor the CLI tools ever read, index, or transmit your private project files, proprietary algorithms, git diffs, or environment files (<code className="font-mono text-white text-[11px] bg-surface px-1 py-0.5 rounded">.env</code>).
                  </li>
                  <li>
                    <strong className="text-white">No Agent Interaction Telemetry:</strong> We do not capture, log, or analyze the prompts you submit to AI assistants, nor the completions generated by those assistants.
                  </li>
                  <li>
                    <strong className="text-white">Local-Only Installation:</strong> Installing a skill (<code className="font-mono text-white text-[11px] bg-surface px-1 py-0.5 rounded">npx domoskills add &lt;skill&gt;</code>) copies markdown instructions directly from public registry bundles to your designated local directory.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="data-we-collect" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">3.</span> What Data We Collect & Why
              </h2>
              <p>
                We only process the minimal information necessary to deliver and maintain the platform:
              </p>
              
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-surface p-4 space-y-2">
                  <h3 className="font-mono text-xs font-bold text-white uppercase">A. Optional User Account Information</h3>
                  <p className="text-xs">
                    Account creation is completely optional. If you choose to sign up or sign in (via Google, GitHub, or Email), we store:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs pl-2">
                    <li>Your email address and unique user identifier (UID).</li>
                    <li>Display name, avatar URL, and optional bio you provide in your profile settings.</li>
                    <li>Links to skills you have submitted or published to the registry.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-surface p-4 space-y-2">
                  <h3 className="font-mono text-xs font-bold text-white uppercase">B. Public Skill Submissions</h3>
                  <p className="text-xs">
                    When you submit a skill through <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">/submit</code>, the submitted data (skill name, description, tags, version, repository URL, and markdown content) is published as open-source information in the public catalog for all users.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface p-4 space-y-2">
                  <h3 className="font-mono text-xs font-bold text-white uppercase">C. Aggregate Platform Metrics</h3>
                  <p className="text-xs">
                    We track high-level, aggregate statistics (such as overall page visit counts and estimated installation counts) to evaluate category popularity and platform health. These counts are aggregate numbers and are <strong>not</strong> tied to personal profiles or individual IP addresses.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="local-storage" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">4.</span> Local-First Device Storage
              </h2>
              <p>
                DomoSkills uses standard browser <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">localStorage</code> to maintain your workflow preferences without requiring a remote database:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
                <li><strong className="text-white">Skill Stack Cart:</strong> The list of skills you have temporarily added to your stack drawer.</li>
                <li><strong className="text-white">Skill Comparator:</strong> The up-to-3 skills currently selected for side-by-side comparison.</li>
                <li><strong className="text-white">Display Preferences:</strong> Your selected catalog density view (Grid, Compact Table, or Dense Matrix).</li>
                <li><strong className="text-white">UI Sound Toggle:</strong> Your preference for interface audio feedback.</li>
              </ul>
              <p className="text-xs text-text-muted">
                This data is stored purely on your local machine. You can clear this data at any time through your browser settings or Developer Tools.
              </p>
            </section>

            {/* Section 5 */}
            <section id="third-party" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">5.</span> Third-Party Infrastructure
              </h2>
              <p>
                To provide authentication and open-source verification, we interact with select reputable infrastructure providers:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">Google Cloud & Firebase:</strong> Used for secure user identity management and storing public registry submissions. Data is hosted within Google Cloud datacenters with strict access controls.
                </li>
                <li>
                  <strong className="text-white">GitHub API:</strong> Used exclusively to retrieve public star counts and verify public repository URLs for community skills.
                </li>
              </ul>
              <p>
                We do not sell, rent, or trade any personal information to third parties, data brokers, or advertising networks.
              </p>
            </section>

            {/* Section 6 */}
            <section id="cookies" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">6.</span> Cookies & Tracking Technologies
              </h2>
              <p>
                We do not use advertising cookies, marketing pixels, or third-party behavioral trackers.
              </p>
              <p>
                Essential cookies may be used exclusively by Firebase Authentication to maintain your session state if you choose to sign in. If you use DomoSkills anonymously without creating an account, no user identity cookies are set.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-retention" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">7.</span> Data Retention & Deletion Rights
              </h2>
              <p>
                You have the right to inspect, edit, or delete any personal information associated with your account:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">Profile Updates:</strong> You can edit your display name, username, bio, and avatar at any time in <Link href="/settings" className="text-cyan-400 underline">Profile Settings</Link>.
                </li>
                <li>
                  <strong className="text-white">Account Deletion:</strong> If you wish to delete your account or withdraw a skill submission, you can submit a request through our GitHub issue tracker or contact the maintainers directly.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="security" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">8.</span> How We Protect Your Data
              </h2>
              <p>
                We employ industry-standard security safeguards to protect platform communications and community submissions:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>All network communications are encrypted in transit via Transport Layer Security (TLS 1.3 / HTTPS).</li>
                <li>Database access is governed by strict, least-privilege security rules.</li>
                <li>Registry ingestion processes enforce AST security validation to prevent malicious uploads from reaching other developers.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="children" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">9.</span> Age Appropriateness
              </h2>
              <p>
                DomoSkills is intended for software developers, engineers, and technical researchers. We do not knowingly collect personal information from children under the age of 13.
              </p>
            </section>

            {/* Section 10 */}
            <section id="changes" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">10.</span> Policy Changes & Updates
              </h2>
              <p>
                If we make material changes to our privacy practices, we will update this document and reflect the new revision date at the top of the page. Because our fundamental architectural commitment is zero code telemetry, changes will primarily concern new platform features or community governance.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact" className="scroll-mt-24 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">11.</span> Contact & Privacy Inquiries
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact the maintainers:
              </p>
              <div className="rounded-xl border border-border bg-surface p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-white">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>GitHub Repository:</span>
                  <a
                    href="https://github.com/darknecrocities/DomoSkills"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    darknecrocities/DomoSkills <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-text-muted text-[11px]">
                  Open a confidential or public inquiry tagged with [Privacy] or [Data Request] in our repository discussions or issues.
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
