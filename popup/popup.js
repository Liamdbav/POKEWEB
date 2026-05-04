const CATEGORY_LABELS = {
  "frontend-framework": "Frontend",
  "meta-framework":     "Meta-framework",
  "css-framework":      "CSS",
  "cms":                "CMS",
  "hosting":            "Hosting / CDN",
  "analytics":          "Analytics",
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHostname(url) {
  try { return new URL(url).hostname; }
  catch { return "—"; }
}

function renderBadge(tech) {
  const icon = window.PokewebIconsMap?.[tech.icon] ?? "📦";
  const versionHtml = tech.version
    ? ` <span class="tech-version">${escHtml(String(tech.version))}</span>`
    : "";
  const implicitClass = tech.implicit ? " implicit" : "";
  const implicitTitle = tech.implicit ? ` title="Déduit du framework parent"` : "";

  return `<span class="tech-badge${implicitClass}"${implicitTitle}>`
    + `<span>${icon}</span> ${escHtml(tech.name)}${versionHtml}`
    + `</span>`;
}

function renderResults(results) {
  const resultsEl = document.getElementById("results");

  if (!results || results.length === 0) {
    resultsEl.className = "empty";
    resultsEl.innerHTML = "Aucune analyse disponible.<br>Rechargez la page.";
    document.getElementById("tech-count").textContent = "0 techno détectée";
    return;
  }

  const byCategory = {};
  for (const tech of results) {
    (byCategory[tech.category] ??= []).push(tech);
  }

  resultsEl.className = "";
  resultsEl.innerHTML = CATEGORY_ORDER
    .filter(cat => byCategory[cat]?.length)
    .map(cat => {
      const badges = byCategory[cat].map(renderBadge).join("");
      return `<div class="category">`
        + `<h2>${escHtml(CATEGORY_LABELS[cat])}</h2>`
        + `<div class="tech-list">${badges}</div>`
        + `</div>`;
    })
    .join("");

  const count = results.length;
  document.getElementById("tech-count").textContent =
    `${count} techno${count > 1 ? "s" : ""} détectée${count > 1 ? "s" : ""}`;
}

function renderStats(stats) {
  const { totalTechnos, totalSites, mostSeen } = stats;
  document.getElementById("collection-stats").innerHTML = `
    <div class="stat">
      <div class="stat-value">${totalTechnos}</div>
      <div class="stat-label">Technos</div>
    </div>
    <div class="stat">
      <div class="stat-value">${totalSites}</div>
      <div class="stat-label">Sites</div>
    </div>
    <div class="stat">
      <div class="stat-value" title="${mostSeen ? escHtml(mostSeen.name) : ""}">${mostSeen ? escHtml(mostSeen.name) : "—"}</div>
      <div class="stat-label">${mostSeen ? `×${mostSeen.count}` : "Aucune"}</div>
    </div>
  `;
}

async function renderCollection() {
  const collection = await self.PokewebStore.getCollection();
  const stats = self.PokewebStore.getStats(collection);
  renderStats(stats);

  const listEl = document.getElementById("collection-list");
  const technos = Object.values(collection);

  if (!technos.length) {
    listEl.innerHTML = `<div class="empty-collection">⚪🔴<br>Visite des sites pour<br>commencer ton Pokéweb personnel !</div>`;
    return;
  }

  const byCategory = {};
  for (const tech of technos) {
    (byCategory[tech.category] ??= []).push(tech);
  }
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort((a, b) => b.count - a.count);
  }

  listEl.innerHTML = CATEGORY_ORDER
    .filter(cat => byCategory[cat]?.length)
    .map(cat => {
      const badges = byCategory[cat].map(tech => {
        const icon = window.PokewebIconsMap?.[tech.icon] ?? "📦";
        return `<span class="tech-badge">`
          + `<span>${icon}</span> ${escHtml(tech.name)}`
          + `<span class="tech-count">${tech.count}</span>`
          + `</span>`;
      }).join("");
      return `<div class="category">`
        + `<h2>${escHtml(CATEGORY_LABELS[cat])}</h2>`
        + `<div class="tech-list">${badges}</div>`
        + `</div>`;
    })
    .join("");
}

function initTabs() {
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b =>
        b.classList.toggle("active", b === btn)
      );
      document.querySelectorAll(".view").forEach(v =>
        v.classList.toggle("hidden", v.id !== `view-${btn.dataset.tab}`)
      );
      // Chargement paresseux : la collection n'est rendue qu'à l'ouverture de son onglet
      if (btn.dataset.tab === "collection") renderCollection();
    });
  });
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  document.getElementById("site-url").textContent = tab?.url
    ? safeHostname(tab.url)
    : "—";

  initTabs();

  if (!tab) {
    renderResults(null);
    return;
  }

  let response = null;
  try {
    response = await chrome.runtime.sendMessage({ type: "get-results", tabId: tab.id });
  } catch (_) {}

  renderResults(response?.results ?? null);

  document.getElementById("rescan-btn").addEventListener("click", () => {
    chrome.tabs.reload(tab.id);
    window.close();
  });
}

document.addEventListener("DOMContentLoaded", init);
