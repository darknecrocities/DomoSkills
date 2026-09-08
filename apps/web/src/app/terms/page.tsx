'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Scale,
  Lock,
  Code2,
  Terminal,
} from 'lucide-react';

export default function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', title: '1. Acceptance of Terms' },
    { id: 'services', title: '2. Description of Service' },
    { id: 'open-source', title: '3. Open Source & Licensing' },
    { id: 'installation', title: '4. Installation & Zero-Execution Model' },
    { id: 'acceptable-use', title: '5. Acceptable Use & Submissions' },
    { id: 'intellectual-property', title: '6. Intellectual Property Rights' },
    { id: 'ast-auditing', title: '7. Security Scanning & Quarantine' },
    { id: 'disclaimer', title: '8. Disclaimer of Warranties' },
    { id: 'liability', title: '9. Limitation of Liability' },
    { id: 'changes', title: '10. Modifications to Terms' },
    { id: 'contact', title: '11. Community Governance & Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
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
              href="/privacy"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Privacy Policy →</span>
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted mb-4">
            <Scale className="h-3.5 w-3.5 text-cyan-400" />
            <span>Legal Documentation • Plain Language</span>
          </div>
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="font-sans text-base text-text-secondary max-w-2xl leading-relaxed">
            Welcome to DomoSkills. These terms define the rules and guidelines governing the use of our open-source
            agent skills registry, website, APIs, and the <code className="text-white bg-surface px-1.5 py-0.5 rounded font-mono text-xs">domoskills</code> CLI package manager.
          </p>
          <div className="mt-4 flex items-center gap-4 font-mono text-xs text-text-muted">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Version: 1.0.0</span>
            <span>•</span>
            <span className="text-emerald-400">Status: Active</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Open Source Standard</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              DomoSkills tooling is MIT licensed. Skills preserve their authors' open licenses.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <Shield className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Zero-Execution Guarantee</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              The CLI never runs arbitrary scripts upon download. All packages are static markdown and references.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Developer Oversight</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              You maintain oversight over how your AI coding assistants apply downloaded guidelines.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold mb-1">
              <Code2 className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Zero Malware Tolerance</span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-normal">
              AST scanners flag and quarantine suspicious patterns, reverse shells, and leaks.
            </p>
          </div>
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 self-start z-10">
            <div className="rounded-xl border border-border bg-surface/95 backdrop-blur-md p-4 space-y-3 font-mono text-xs max-h-[calc(100vh-8rem)] overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  On This Page
                </span>
                <span className="text-[10px] text-text-muted">
                  {sections.length} Sections
                </span>
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`block py-1.5 px-2.5 rounded-lg transition text-xs leading-snug ${
                        isActive
                          ? 'bg-white/10 text-white font-bold border-l-2 border-cyan-400 pl-2 shadow-sm'
                          : 'text-text-secondary hover:text-white hover:bg-surface-raised'
                      }`}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </nav>
              <div className="pt-3 border-t border-border">
                <Link
                  href="/privacy"
                  className="text-cyan-400 hover:underline block text-[11px]"
                >
                  Read Privacy Policy →
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Text Sections */}
          <main className="lg:col-span-8 space-y-12 font-sans text-sm text-text-secondary leading-relaxed">
            
            {/* Section 1 */}
            <section id="overview" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing or using the DomoSkills web portal (<code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">domoskills</code>),
                the command-line interface (<code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">npx domoskills</code>),
                the public registry data, or any related services, you confirm that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p>
                If you are using DomoSkills on behalf of an organization, company, or other legal entity, you represent and warrant that you have full authority to bind that entity to these Terms. If you do not agree with any part of these Terms, you must not use or access DomoSkills.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">2.</span> Description of Service
              </h2>
              <p>
                DomoSkills is an open-source registry, discovery engine, and CLI package manager designed for AI Agent Skills. The service enables software developers to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
                <li>Search, discover, and inspect modular capability packages containing <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">SKILL.md</code> instructions.</li>
                <li>Download and organize capability definitions into designated AI assistant directories (such as <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">.agent/skills</code>, <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">.claude/skills</code>, and <code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">.cursor/skills</code>).</li>
                <li>Generate and maintain reproducible lockfiles (<code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">domoskills.json</code>) across teams.</li>
                <li>Run diagnostics on local development workspaces and inspect configuration markers.</li>
                <li>Submit community skills for review, indexing, and inclusion in the open directory.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="open-source" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">3.</span> Open Source & Licensing
              </h2>
              <p>
                The core platform codebase—including the web application, CLI client, parser packages, and adapters—is licensed under the permissive <strong className="text-white">MIT License</strong>.
              </p>
              <p>
                Individual skills indexed within the DomoSkills registry are authored by various community members and organizations and are released under their respective open-source licenses (such as MIT, Apache-2.0, or BSD-3-Clause). When you download or install a skill:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>You receive that skill subject to the author’s declared open-source license specified in the skill’s YAML frontmatter.</li>
                <li>DomoSkills does not claim ownership of third-party skill instructions.</li>
                <li>You are responsible for ensuring that your usage complies with the specific license terms of any skill you choose to install.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="installation" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">4.</span> Installation & Zero-Execution Model
              </h2>
              <p>
                DomoSkills is engineered around a <strong className="text-white">zero-automatic-execution model</strong>:
              </p>
              <div className="rounded-lg border border-border bg-surface p-4 space-y-2 font-sans text-xs">
                <p className="text-white font-semibold">Important Architectural Principle:</p>
                <p>
                  The <code className="font-mono text-xs">domoskills add</code> and <code className="font-mono text-xs">domoskills install</code> commands only download, verify, and write static Markdown files and documentation to your disk. DomoSkills <strong>never</strong> executes arbitrary build scripts, shell hooks, or binary payloads upon installation.
                </p>
              </div>
              <p>
                You acknowledge that AI coding assistants (e.g., Claude Code, Cursor, Codex, Copilot, Antigravity) read these instructions as natural language context. While DomoSkills scans all submissions for malicious patterns, you remain solely responsible for reviewing any installed skill before prompting your agent to follow its guidance.
              </p>
            </section>

            {/* Section 5 */}
            <section id="acceptable-use" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">5.</span> Acceptable Use & Submissions
              </h2>
              <p>
                When submitting skills to the registry or using the platform, you agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Submit packages containing malicious code, backdoors, exploits, keyloggers, or unauthorized telemetry collectors.</li>
                <li>Submit packages containing instructions intended to bypass security controls, generate malware, or conduct unauthorized network intrusions.</li>
                <li>Include hardcoded API secrets, private cryptographic keys, authentication tokens, or personal confidential data in any submission.</li>
                <li>Attempt directory traversal attacks (<code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">../</code>) or absolute path escapes within file structures.</li>
                <li>Submit content that infringes upon third-party patents, copyrights, trademarks, or trade secrets.</li>
                <li>Impersonate another developer, project, or organization.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="intellectual-property" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">6.</span> Intellectual Property Rights
              </h2>
              <p>
                You retain all copyright and ownership rights to the original content you author and submit to the DomoSkills registry.
              </p>
              <p>
                By publishing or submitting a skill through our submission portal or pull request workflow, you grant DomoSkills a worldwide, non-exclusive, royalty-free, perpetual license to host, cache, display, parse, index, and distribute the package through our public API, web platform, and CLI client, consistent with the open-source license you designate.
              </p>
            </section>

            {/* Section 7 */}
            <section id="ast-auditing" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">7.</span> Security Scanning & Quarantine
              </h2>
              <p>
                Every skill submitted to or indexed by DomoSkills undergoes automated static analysis. The scanner evaluates:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Presence of shell pipes (<code className="font-mono text-white text-xs bg-surface px-1 py-0.5 rounded">curl | bash</code>).</li>
                <li>Presence of compiled binaries or standalone script files.</li>
                <li>Dangerous file system operations and destructive removal commands.</li>
                <li>Detected private keys, credentials, or obfuscated code blocks.</li>
              </ul>
              <p>
                DomoSkills reserves the right to withhold, quarantine in read-only mode, or permanently remove any package that fails our security standards or receives a security score below minimum operating thresholds.
              </p>
            </section>

            {/* Section 8 */}
            <section id="disclaimer" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">8.</span> Disclaimer of Warranties
              </h2>
              <div className="rounded-lg border border-border bg-surface p-4 font-mono text-xs text-text-secondary uppercase">
                DOMOSKILLS AND ALL REGISTRY PACKAGES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </div>
              <p>
                We do not guarantee that the service will be uninterrupted, error-free, or entirely secure. Because AI coding assistants utilize probabilistic models, DomoSkills does not warrant that code generated using any indexed skill will compile without errors, be free of security flaws, or fulfill your specific technical requirements.
              </p>
            </section>

            {/* Section 9 */}
            <section id="liability" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">9.</span> Limitation of Liability
              </h2>
              <div className="rounded-lg border border-border bg-surface p-4 font-mono text-xs text-text-secondary uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE DOMOSKILLS MAINTAINERS, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR CODE INTEGRITY, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE PLATFORM OR ANY INDEXED SKILLS.
              </div>
            </section>

            {/* Section 10 */}
            <section id="changes" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">10.</span> Modifications to Terms
              </h2>
              <p>
                We may revise these Terms of Service periodically to reflect changes in our platform architecture, community practices, or regulatory requirements. Any modifications will be posted directly to this page with an updated revision date.
              </p>
              <p>
                Your continued use of the DomoSkills registry or CLI following the posting of revised Terms constitutes your acceptance of the changes.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact" className="scroll-mt-28 space-y-3">
              <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">11.</span> Community Governance & Contact
              </h2>
              <p>
                DomoSkills is operated transparently as an open-source initiative. If you have questions about these Terms, wish to report a trademark issue, or need to disclose a security vulnerability, please reach out through our community channels:
              </p>
              <div className="rounded-xl border border-border bg-surface p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-white">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>GitHub Repository:</span>
                  <a
                    href="https://github.com/darknecrocities/DomoSkills"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    darknecrocities/DomoSkills <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-text-muted text-[11px]">
                  For security disclosures or takedown notices, open an issue labeled with [Security] or [Legal] on our issue tracker.
                </div>
              </div>
            </section>

          </main>
        </div>

      </div>
    </div>
  );
}
