const CATEGORY_LABELS = {
  "frontend-framework": "Frontend",
  "meta-framework":     "Meta-framework",
  "backend-framework":  "Backend",
  "cms":                "CMS",
  "css-framework":      "CSS",
  "js-library":         "Bibliothèques JS",
  "web-server":         "Serveur web",
  "hosting":            "Hosting / CDN",
  "analytics":          "Analytics",
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

// Noms des fingerprints désactivés — chargé une fois dans init(), partagé par toutes les vues
let disabledSet = new Set();

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

// ── Disabled store ───────────────────────────────────────────────

function loadDisabled() {
  return new Promise(resolve => {
    chrome.storage.local.get("disabled", data => {
      resolve(new Set(data.disabled ?? []));
    });
  });
}

function saveDisabled() {
  chrome.storage.local.set({ disabled: [...disabledSet] });
}

// ── Vue "Site actuel" ────────────────────────────────────────────

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

  // Filtre les technos désactivées avant affichage
  const visible = results?.filter(r => !disabledSet.has(r.name)) ?? null;

  if (!visible || visible.length === 0) {
    resultsEl.className = "empty";
    resultsEl.innerHTML = "Aucune analyse disponible.<br>Rechargez la page.";
    document.getElementById("tech-count").textContent = "0 techno détectée";
    return;
  }

  const byCategory = {};
  for (const tech of visible) {
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

  const count = visible.length;
  document.getElementById("tech-count").textContent =
    `${count} techno${count > 1 ? "s" : ""} détectée${count > 1 ? "s" : ""}`;
}

// ── Vue "Collection" ─────────────────────────────────────────────

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

// ── Vue "Filtres" ────────────────────────────────────────────────

function updateFiltersCount() {
  const total = (window.PokewebFingerprintsMeta || []).length;
  const active = total - disabledSet.size;
  const el = document.getElementById("filters-count");
  if (el) el.textContent = `${active} / ${total} actives`;
}

function renderFilters() {
  const listEl = document.getElementById("filters-list");
  if (!listEl) return;

  const meta = window.PokewebFingerprintsMeta || [];
  const byCategory = {};
  for (const fp of meta) {
    (byCategory[fp.category] ??= []).push(fp);
  }

  listEl.innerHTML = CATEGORY_ORDER
    .filter(cat => byCategory[cat]?.length)
    .map(cat => {
      const items = byCategory[cat].map(fp => {
        const icon = window.PokewebIconsMap?.[fp.icon] ?? "📦";
        const checked = disabledSet.has(fp.name) ? "" : " checked";
        return `<label class="filter-item">`
          + `<input type="checkbox" value="${escHtml(fp.name)}"${checked}>`
          + `<span class="filter-item-icon">${icon}</span>`
          + `<span class="filter-item-name">${escHtml(fp.name)}</span>`
          + `</label>`;
      }).join("");

      return `<div class="filter-category">`
        + `<div class="filter-cat-header">`
        + `<span>${escHtml(CATEGORY_LABELS[cat])}</span>`
        + `<div class="filter-cat-actions">`
        + `<button class="btn-link" data-action="all" data-cat="${cat}" type="button">Tout</button>`
        + `<button class="btn-link" data-action="none" data-cat="${cat}" type="button">Aucun</button>`
        + `</div></div>`
        + `<div class="filter-items">${items}</div>`
        + `</div>`;
    })
    .join("");

  listEl.querySelectorAll(".filter-item input").forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) disabledSet.delete(cb.value);
      else disabledSet.add(cb.value);
      saveDisabled();
      updateFiltersCount();
    });
  });

  listEl.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const fps = byCategory[btn.dataset.cat] ?? [];
      if (btn.dataset.action === "all") fps.forEach(fp => disabledSet.delete(fp.name));
      else fps.forEach(fp => disabledSet.add(fp.name));
      saveDisabled();
      renderFilters();
    });
  });

  updateFiltersCount();
}

// ── Tabs ─────────────────────────────────────────────────────────

function initTabs() {
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b =>
        b.classList.toggle("active", b === btn)
      );
      document.querySelectorAll(".view").forEach(v =>
        v.classList.toggle("hidden", v.id !== `view-${btn.dataset.tab}`)
      );
      if (btn.dataset.tab === "collection") renderCollection();
      if (btn.dataset.tab === "filters") renderFilters();
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────

async function init() {
  disabledSet = await loadDisabled();

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

  document.getElementById("reset-collection-btn").addEventListener("click", async () => {
    if (!confirm("Vider ton Pokéweb personnel ? Cette action est irréversible.")) return;
    await self.PokewebStore.clearCollection();
    await renderCollection();
  });

  document.getElementById("filters-enable-all-btn").addEventListener("click", () => {
    disabledSet.clear();
    saveDisabled();
    renderFilters();
  });
}

document.addEventListener("DOMContentLoaded", init);
