# Pokéweb — Extension Chrome de détection de stack technique

## Vision produit
Extension Chrome destinée aux vibecoders qui veulent identifier rapidement la stack technique d'un site web qu'ils visitent (frameworks JS, CSS, CMS, hosting, analytics). UX inspirée d'un Pokédex : on "capture" les technos détectées.

## Stack technique du projet
- Manifest V3 (obligatoire, V2 deprecated)
- Vanilla JavaScript (pas de framework, pas de bundler)
- HTML + CSS natifs
- Pas de dépendances npm
- chrome.storage.local pour l'historique

## Architecture des contextes d'exécution
- `background.js` (service worker) : intercepte les headers HTTP via chrome.webRequest, orchestre la détection
- `content.js` (content script) : injecté dans chaque page, analyse le DOM et les globals window
- `popup.html` + `popup.js` : UI affichée au clic sur l'icône, lit les résultats et les affiche
- Communication : chrome.runtime.sendMessage entre les contextes

## Conventions de code
- camelCase pour les variables et fonctions
- Pas de classes ES6 sauf nécessité — fonctions pures privilégiées
- Commentaires en français, courts, expliquent le pourquoi pas le quoi
- Un fingerprint = un objet dans `fingerprints/` (un fichier par catégorie)

## Catégories de détection (ordre d'affichage dans la popup)
1. Frontend frameworks (React, Vue, Svelte, Angular, Solid, Alpine.js, Lit, Ember, Qwik…)
2. Meta-frameworks (Next.js, Nuxt, Remix, Astro, SvelteKit, Gatsby)
3. Backend frameworks (Express, Laravel, Django, Rails, ASP.NET)
4. CMS (WordPress, Shopify, Webflow, Ghost, Drupal, Joomla, Magento, WooCommerce…)
5. CSS frameworks (Tailwind, Bootstrap, Bulma, Ant Design, Styled Components, Emotion…)
6. Bibliothèques JS (jQuery, Three.js, D3.js, Chart.js, GSAP, Moment.js, Day.js)
7. Serveurs web (Nginx, Apache, Caddy, LiteSpeed, IIS, Varnish)
8. Hosting / CDN (Vercel, Netlify, Cloudflare, AWS CloudFront, GitHub Pages, Fastly)
9. Analytics (GA, Plausible, Fathom, PostHog, Mixpanel, Hotjar, Segment, Sentry, Firebase)

## Hors-scope V1
- Pas d'export en PDF/JSON (V2)
- Pas de comparaison entre sites (V2)
- Pas de mode dark/light switchable (dark par défaut, point)
- Pas de support Firefox (Chrome only)

## Storage

### `chrome.storage.local` — clé `"collection"`
Collection persistante de toutes les technos détectées. Un objet indexé par nom de techno :
```javascript
{
  "Next.js": {
    name: "Next.js",           // identifiant stable
    category: "meta-framework",
    icon: "nextjs",            // clé dans PokewebIconsMap
    firstSeen: 1730000000000,  // timestamp premier scan
    lastSeen:  1730500000000,  // timestamp dernier scan
    count: 12,                 // nombre total de détections
    sites: ["nextjs.org", "vercel.com"]  // hostnames uniques, max 50, FIFO
  }
}
```
Règles de mise à jour (dans `collection-store.js`) :
- Nouvelle techno : créer avec count=1, firstSeen=lastSeen=now
- Même techno, nouveau site : count++, lastSeen=now, push hostname (shift si >50)
- Même techno, même site qu'une détection précédente : count++, lastSeen=now, sites inchangé
- Les technos `implicit: true` sont enregistrées sans distinction

### `chrome.storage.session` — clé `"result-${tabId}"`
Résultats temporaires de la dernière analyse par onglet. Effacés à la fermeture du tab.
Format : `{ url: string, results: [{ name, category, icon, version, implicit? }] }`

## Commandes utiles
- Charger l'extension : chrome://extensions/ → mode développeur ON → "Charger l'extension non empaquetée" → sélectionner le dossier du projet
- Recharger après modification : icône reload dans chrome://extensions/
- Inspecter le service worker : chrome://extensions/ → "Service worker" lien sous l'extension
- Inspecter le content script : DevTools de la page → onglet Sources → Content scripts
- Inspecter la popup : clic droit sur l'icône extension → "Inspecter la popup"
