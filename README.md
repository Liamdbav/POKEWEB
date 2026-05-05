<div align="center">
  <img src="icons/icon128.png" alt="Pokéweb" width="96" />
  <h1>Pokéweb</h1>
</div>

Extension Chrome qui détecte la stack technique des sites web visités. UX inspirée d'un Pokédex : chaque techno détectée est "capturée" dans ton Pokéweb personnel.

> **WIP — V1 en cours de développement**

---

## Fonctionnalités

- **Détection en temps réel** de la stack technique du site visité
- **75 technos détectées** dans 9 catégories
- **Pokéweb personnel** — historique persistant de toutes les technos rencontrées, avec compteur par techno
- **Détection multi-sources** — analyse du DOM, globals `window`, balises `<meta>`, URLs de scripts, cookies et headers HTTP

## Technos détectées

| Catégorie | Technos |
|---|---|
| Frontend | React, Vue, Svelte, Angular, Solid, Preact, Alpine.js, Lit, Ember.js, Qwik, Backbone.js, Mithril, Aurelia, Riot.js |
| Meta-frameworks | Next.js, Nuxt, Remix, Astro, SvelteKit, Gatsby |
| Backend | Express, Laravel, Django, Ruby on Rails, ASP.NET |
| CMS | WordPress, Shopify, Webflow, Ghost, Wix, Squarespace, Drupal, Joomla, Magento, WooCommerce, PrestaShop, OpenCart |
| CSS | Tailwind CSS, Bootstrap, Bulma, Chakra UI, Material UI, Foundation, Ant Design, Framer Motion, Styled Components, Emotion |
| Bibliothèques JS | jQuery, Three.js, D3.js, Chart.js, GSAP, Moment.js, Day.js |
| Serveurs web | Nginx, Apache, Caddy, LiteSpeed, Microsoft IIS, Varnish |
| Hosting / CDN | Vercel, Netlify, Cloudflare, AWS CloudFront, GitHub Pages, Fastly |
| Analytics | Google Analytics, Plausible, Fathom, PostHog, Mixpanel, Hotjar, Segment, Sentry, Firebase |

---

## Installation locale

1. Ouvrir `chrome://extensions/` dans Chrome
2. Activer le **mode développeur** (interrupteur en haut à droite)
3. Cliquer sur **"Charger l'extension non empaquetée"**
4. Sélectionner le dossier du projet

## Stack technique

- **Manifest V3**, Vanilla JS, HTML + CSS natifs
- Aucune dépendance npm, aucun bundler

---

<div align="center">

Fait avec soin par **Liam** - License MIT — voir [LICENSE](LICENSE)

[![Follow on X](https://img.shields.io/badge/Follow-%40Liamdbav-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/Liamdbav)

</div>

