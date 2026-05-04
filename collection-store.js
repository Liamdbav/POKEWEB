// Accessible dans les deux contextes : window.PokewebStore (popup) et
// self.PokewebStore (service worker classique via importScripts).
(() => {
  const STORAGE_KEY = "collection";
  const MAX_SITES = 50;

  // Migration depuis l'ancienne clé "pokedex" (renommée en "collection")
  function migrate() {
    chrome.storage.local.get(["pokedex", "collection"], data => {
      if (data.pokedex && !data.collection) {
        chrome.storage.local.set({ collection: data.pokedex }, () => {
          chrome.storage.local.remove("pokedex");
          console.log("Migration pokedex → collection effectuée");
        });
      }
    });
  }

  migrate();

  function getCollection() {
    return new Promise(resolve => {
      chrome.storage.local.get(STORAGE_KEY, data => {
        resolve(data[STORAGE_KEY] ?? {});
      });
    });
  }

  function recordDetection(hostname, technos) {
    if (!hostname || !technos?.length) return;
    const now = Date.now();

    chrome.storage.local.get(STORAGE_KEY, data => {
      const collection = data[STORAGE_KEY] ?? {};

      for (const tech of technos) {
        const existing = collection[tech.name];
        if (!existing) {
          collection[tech.name] = {
            name: tech.name,
            category: tech.category,
            icon: tech.icon,
            firstSeen: now,
            lastSeen: now,
            count: 1,
            sites: [hostname],
          };
        } else {
          existing.count++;
          existing.lastSeen = now;
          if (!existing.sites.includes(hostname)) {
            existing.sites.push(hostname);
            // FIFO : retire le plus ancien si on dépasse la limite
            if (existing.sites.length > MAX_SITES) existing.sites.shift();
          }
        }
      }

      chrome.storage.local.set({ [STORAGE_KEY]: collection });
    });
  }

  function clearCollection() {
    return new Promise(resolve => {
      chrome.storage.local.remove(STORAGE_KEY, resolve);
    });
  }

  // Calcule les stats à partir d'un objet collection déjà chargé (pas d'I/O)
  function getStats(collection) {
    const technos = Object.values(collection);
    if (!technos.length) return { totalTechnos: 0, totalSites: 0, mostSeen: null };

    const allSites = new Set(technos.flatMap(t => t.sites));
    const mostSeen = technos.reduce((a, b) => a.count > b.count ? a : b);

    return {
      totalTechnos: technos.length,
      totalSites: allSites.size,
      mostSeen: { name: mostSeen.name, count: mostSeen.count },
    };
  }

  self.PokewebStore = { getCollection, recordDetection, clearCollection, getStats };
})();
