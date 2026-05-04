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
1. Frontend frameworks (React, Vue, Svelte, Angular, Solid)
2. Meta-frameworks (Next.js, Nuxt, Remix, Astro, SvelteKit)
3. CSS frameworks (Tailwind, Bootstrap, Bulma)
4. CMS (WordPress, Shopify, Webflow, Ghost)
5. Hosting / CDN (Vercel, Netlify, Cloudflare, AWS)
6. Analytics (GA, Plausible, Fathom, PostHog)

## Hors-scope V1
- Pas d'export en PDF/JSON (V2)
- Pas de comparaison entre sites (V2)
- Pas de mode dark/light switchable (dark par défaut, point)
- Pas de support Firefox (Chrome only)

## Commandes utiles
- Charger l'extension : chrome://extensions/ → mode développeur ON → "Charger l'extension non empaquetée" → sélectionner le dossier du projet
- Recharger après modification : icône reload dans chrome://extensions/
- Inspecter le service worker : chrome://extensions/ → "Service worker" lien sous l'extension
- Inspecter le content script : DevTools de la page → onglet Sources → Content scripts
- Inspecter la popup : clic droit sur l'icône extension → "Inspecter la popup"
