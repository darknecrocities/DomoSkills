// DomoSkills — Official Anna App Bundle Logic
// 100% CSP-compliant, zero inline scripts or eval

const SKILLS = [
  {
    id: "owasp-agent-guardian",
    name: "owasp-agent-guardian",
    category: "Security",
    desc: "Enforces OWASP Top 10 for LLM Applications and checks AST safety for autonomous coding agent actions.",
    trust: "100/100",
    tags: ["LLM Security", "Prompt Injection", "AST Guard"]
  },
  {
    id: "react-performance",
    name: "react-performance",
    category: "Frontend",
    desc: "Diagnoses re-renders, detects memory leaks, and optimizes component virtualization in React 18/19.",
    trust: "99/100",
    tags: ["React 19", "Re-renders", "Profiling"]
  },
  {
    id: "fastapi-clean-architecture",
    name: "fastapi-clean-architecture",
    category: "Backend",
    desc: "Scaffolds domain-driven design, Pydantic schemas, dependency injection, and async database pipelines.",
    trust: "98/100",
    tags: ["FastAPI", "Python", "DDD", "Async"]
  },
  {
    id: "rag-pipeline-architect",
    name: "rag-pipeline-architect",
    category: "AI/ML",
    desc: "Designs production retrieval-augmented generation pipelines, chunking, and vector index strategies.",
    trust: "98/100",
    tags: ["RAG", "Embeddings", "Vector DB"]
  },
  {
    id: "nextjs-app-router",
    name: "nextjs-app-router",
    category: "Frontend",
    desc: "Expert guidance on React Server Components, server actions, route handlers, and streaming SSR.",
    trust: "99/100",
    tags: ["Next.js 15", "RSC", "Server Actions"]
  },
  {
    id: "docker-compose-production",
    name: "docker-compose-production",
    category: "DevOps",
    desc: "Generates multi-stage Docker builds, non-root user sandboxing, and hardened network bridges.",
    trust: "97/100",
    tags: ["Docker", "Hardening", "Production"]
  },
  {
    id: "database-indexing-wizard",
    name: "database-indexing-wizard",
    category: "Architecture",
    desc: "Analyzes EXPLAIN ANALYZE queries, detects sequential table scans, and creates composite indexes.",
    trust: "98/100",
    tags: ["PostgreSQL", "SQL", "Indexing", "Performance"]
  },
  {
    id: "cloud-security-hardening",
    name: "cloud-security-hardening",
    category: "Security",
    desc: "Audits IAM roles, principle of least privilege, Cloudflare WAF policies, and secrets rotation.",
    trust: "99/100",
    tags: ["Cloud Security", "IAM", "Secrets"]
  },
  {
    id: "antigravity-suite-master",
    name: "antigravity-suite-master",
    category: "AI/ML",
    desc: "Guides the creation and orchestration of multi-agent Google Antigravity workflows and skills.",
    trust: "100/100",
    tags: ["Google Antigravity", "Multi-Agent", "MCP"]
  },
  {
    id: "prisma-schema-architect",
    name: "prisma-schema-architect",
    category: "Backend",
    desc: "Validates relational integrity, generates efficient migration paths, and tunes relation queries.",
    trust: "96/100",
    tags: ["Prisma", "ORM", "Migrations"]
  },
  {
    id: "kubernetes-production-manifests",
    name: "kubernetes-production-manifests",
    category: "DevOps",
    desc: "Generates zero-downtime K8s Deployments, StatefulSets, HPA rules, and network security policies.",
    trust: "97/100",
    tags: ["K8s", "Helm", "HPA", "Zero-Downtime"]
  },
  {
    id: "graphql-federation-expert",
    name: "graphql-federation-expert",
    category: "Architecture",
    desc: "Architects federated GraphQL subgraphs, entity resolvers, and DataLoader batch optimizations.",
    trust: "96/100",
    tags: ["GraphQL", "Apollo", "Federation"]
  }
];

let currentCategory = "all";

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function copyCmd(cmd) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cmd).then(() => {
      showToast("Copied: " + cmd);
    }).catch(() => {
      fallbackCopy(cmd);
    });
  } else {
    fallbackCopy(cmd);
  }
}

function fallbackCopy(cmd) {
  const ta = document.createElement('textarea');
  ta.value = cmd;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast("Copied: " + cmd);
  } catch (err) {
    showToast("Command: " + cmd);
  }
  document.body.removeChild(ta);
}

function renderSkills() {
  const searchEl = document.getElementById('search-box');
  const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const filtered = SKILLS.filter(s => {
    const matchesCat = currentCategory === 'all' || s.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesQ = !q ||
      s.name.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.tags && s.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCat && matchesQ;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
        <p style="font-size: 1rem; margin-bottom: 0.5rem;">No skills found matching "${escapeHtml(q)}".</p>
        <p style="font-size: 0.8rem;">Try searching for "react", "security", "docker", or select "All Categories".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(s => `
    <div class="card" data-skill-id="${escapeHtml(s.id)}">
      <div>
        <div class="card-header">
          <span class="card-title">${escapeHtml(s.name)}</span>
          <span class="badge">Trust ${escapeHtml(s.trust)}</span>
        </div>
        <div class="card-meta" style="margin-top: 0.35rem;">
          <span>${escapeHtml(s.category)}</span> • <span>Multi-Agent Ready</span>
        </div>
        <p class="card-desc" style="margin-top: 0.6rem;">${escapeHtml(s.desc)}</p>
      </div>
      <div class="card-footer">
        <div class="cmd-box" title="npx domoskills add ${escapeHtml(s.id)}">npx domoskills add ${escapeHtml(s.id)}</div>
        <button type="button" class="copy-btn" data-copy-cmd="npx domoskills add ${escapeHtml(s.id)}">Copy</button>
      </div>
    </div>
  `).join('');
}

function setCategory(cat, el) {
  currentCategory = cat;
  document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSkills();
}

function setTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  const browseView = document.getElementById('browse-view');
  const quickstartView = document.getElementById('quickstart-view');
  const webView = document.getElementById('web-view');

  if (browseView) browseView.style.display = 'none';
  if (quickstartView) quickstartView.style.display = 'none';
  if (webView) webView.style.display = 'none';

  if (tab === 'browse') {
    const btn = document.getElementById('tab-browse');
    if (btn) btn.classList.add('active');
    if (browseView) browseView.style.display = 'block';
  } else if (tab === 'quickstart') {
    const btn = document.getElementById('tab-quickstart');
    if (btn) btn.classList.add('active');
    if (quickstartView) quickstartView.style.display = 'block';
  } else if (tab === 'web') {
    const btn = document.getElementById('tab-web');
    if (btn) btn.classList.add('active');
    if (webView) webView.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tab buttons
  const tabBrowse = document.getElementById('tab-browse');
  const tabQuickstart = document.getElementById('tab-quickstart');
  const tabWeb = document.getElementById('tab-web');

  if (tabBrowse) tabBrowse.addEventListener('click', () => setTab('browse'));
  if (tabQuickstart) tabQuickstart.addEventListener('click', () => setTab('quickstart'));
  if (tabWeb) tabWeb.addEventListener('click', () => setTab('web'));

  // 2. Search input
  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', () => renderSkills());
  }

  // 3. Category filter pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const cat = pill.getAttribute('data-category') || 'all';
      setCategory(cat, pill);
    });
  });

  // 4. Skills grid copy button clicks (event delegation)
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('.copy-btn')) {
        const cmd = target.getAttribute('data-copy-cmd');
        if (cmd) copyCmd(cmd);
      }
    });
  }

  // 5. Quickstart copy buttons
  document.querySelectorAll('.qs-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-copy-cmd');
      if (cmd) copyCmd(cmd);
    });
  });

  // Initial state from URL parameters or hash
  try {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace('#', '');
    const tabParam = params.get('tab') || hash;
    if (tabParam && ['browse', 'quickstart', 'web'].includes(tabParam)) {
      setTab(tabParam);
    }
    const catParam = params.get('category');
    if (catParam) {
      const pill = document.querySelector(`.filter-pill[data-category="${catParam}"]`);
      if (pill) setCategory(catParam, pill);
    }
    const searchParam = params.get('search');
    if (searchParam && searchBox) {
      searchBox.value = searchParam;
    }
  } catch (e) {
    console.error('URL params init error:', e);
  }

  // Initial render
  renderSkills();
});

