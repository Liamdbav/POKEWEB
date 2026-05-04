console.log("Pokéweb service worker actif");

// Fingerprints avec détection par headers HTTP uniquement.
// Dupliqué ici car les fichiers fingerprints/ utilisent le pattern IIFE + window
// (incompatible avec un module service worker). Les données DOM restent côté content script.
const headerFingerprints = [
  {
    name: "Next.js",
    category: "meta-framework",
    icon: "nextjs",
    headers: [{ name: "x-powered-by", value: /next\.js/i }],
  },
  {
    name: "Vercel",
    category: "hosting",
    icon: "vercel",
    headers: [
      { name: "x-vercel-id", value: /.+/ },
      { name: "server", value: /vercel/i },
    ],
  },
  {
    name: "Netlify",
    category: "hosting",
    icon: "netlify",
    headers: [
      { name: "x-nf-request-id", value: /.+/ },
      { name: "server", value: /netlify/i },
    ],
  },
  {
    name: "Cloudflare",
    category: "hosting",
    icon: "cloudflare",
    headers: [
      { name: "cf-ray", value: /.+/ },
      { name: "server", value: /cloudflare/i },
    ],
  },
  {
    name: "AWS CloudFront",
    category: "hosting",
    icon: "cloudfront",
    headers: [
      { name: "x-amz-cf-id", value: /.+/ },
      { name: "via", value: /cloudfront/i },
    ],
  },
  {
    name: "GitHub Pages",
    category: "hosting",
    icon: "github",
    headers: [
      { name: "x-github-request-id", value: /.+/ },
      { name: "server", value: /github\.com/i },
    ],
  },
  {
    name: "Fastly",
    category: "hosting",
    icon: "fastly",
    headers: [
      { name: "x-served-by", value: /cache-[a-z]+-fastly/i },
      { name: "x-fastly-request-id", value: /.+/ },
    ],
  },
  {
    name: "Shopify",
    category: "cms",
    icon: "shopify",
    headers: [{ name: "x-shopify-stage", value: /.+/ }],
  },
];

function matchesHeader(headers, { name, value }) {
  const h = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
  if (!h) return false;
  return value instanceof RegExp ? value.test(h.value) : h.value === value;
}

function detectFromHeaders(rawHeaders) {
  const headers = rawHeaders.map(h => ({ name: h.name, value: h.value ?? "" }));
  const results = [];
  for (const fp of headerFingerprints) {
    if (fp.headers.some(rule => matchesHeader(headers, rule))) {
      results.push({ name: fp.name, category: fp.category, icon: fp.icon, version: null });
    }
  }
  return results;
}

// Headers de la requête principale par tabId, effacés à la fermeture du tab
const headersByTab = new Map();

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    if (details.responseHeaders) {
      headersByTab.set(details.tabId, details.responseHeaders);
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["responseHeaders"]
);

chrome.tabs.onRemoved.addListener((tabId) => {
  headersByTab.delete(tabId);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "detection-result") {
    const tabId = sender.tab?.id;
    if (!tabId) return;

    const rawHeaders = headersByTab.get(tabId) ?? [];
    const headerResults = detectFromHeaders(rawHeaders);

    // Fusionne en dédoublonnant par name (le content script a priorité sur la version)
    const merged = [...message.results];
    const existingNames = new Set(merged.map(r => r.name));
    for (const r of headerResults) {
      if (!existingNames.has(r.name)) merged.push(r);
    }

    console.log(`Pokéweb [tab ${tabId}] — ${merged.length} techno(s) :`, merged);

    chrome.storage.session.set({ [`result-${tabId}`]: { url: message.url, results: merged } });
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === "get-results") {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab) { sendResponse(null); return; }
      chrome.storage.session.get(`result-${tab.id}`, (data) => {
        sendResponse(data[`result-${tab.id}`] ?? null);
      });
    });
    return true;
  }
});
