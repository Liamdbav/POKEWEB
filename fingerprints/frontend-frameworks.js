(() => {
  const entries = [
    {
      name: "React",
      category: "frontend-framework",
      icon: "react",
      detect: {
        // window.React disparu en prod bundlé ; [data-reactroot] retiré en React 18.
        // __REACT_DEVTOOLS_GLOBAL_HOOK__ est injecté par React dès le chargement, même bundlé.
        // Les clés __reactFiber$ / __reactContainer$ apparaissent dans les attributs DOM React 18.
        globals: ["__REACT_DEVTOOLS_GLOBAL_HOOK__", "React"],
        htmlPatterns: [
          /__reactFiber\$/,
          /__reactContainer\$/,
          /__reactProps\$/,
        ],
        domSelectors: ["[data-react-helmet]"],
        scriptSrc: [/react-dom/i, /\/react\./i],
      },
      versionDetect: (w) => w.React?.version ?? null,
    },
    {
      name: "Vue",
      category: "frontend-framework",
      icon: "vue",
      detect: {
        // Vue 3 n'expose plus window.Vue par défaut en prod.
        // __vue_app__ apparaît sur le nœud racine de l'app dans le HTML sérialisé.
        // data-v-xxxxxxxx = attributs de scoped CSS, hash 8 chars hexadécimaux.
        globals: ["__VUE__", "Vue"],
        htmlPatterns: [/__vue_app__/, /data-v-[a-f0-9]{8}/i],
        scriptSrc: [/\/vue(?:\.runtime)?(?:\.esm)?(?:\.min)?\.js/i, /\/vue@/i],
      },
      versionDetect: (w) => w.Vue?.version ?? null,
    },
    {
      name: "Svelte",
      category: "frontend-framework",
      icon: "svelte",
      detect: {
        // svelte-xxxxxx = classes CSS hashées injectées par le compilateur Svelte.
        htmlPatterns: [/svelte-[a-z0-9]{6}/i],
        domSelectors: ["[class*='svelte-']"],
        scriptSrc: [/svelte/i],
      },
      versionDetect: null,
    },
    {
      name: "Angular",
      category: "frontend-framework",
      icon: "angular",
      detect: {
        globals: ["ng"],
        domSelectors: ["[ng-version]", "[_nghost-]", "[_ngcontent-]"],
        scriptSrc: [/@angular\//i, /angular\.min\.js/i],
      },
      versionDetect: () => {
        const el = document.querySelector("[ng-version]");
        return el ? el.getAttribute("ng-version") : null;
      },
    },
    {
      name: "Solid",
      category: "frontend-framework",
      icon: "solid",
      detect: {
        // _$HY = objet d'hydratation Solid, présent sur window lors du SSR/hydration.
        globals: ["_$HY"],
        scriptSrc: [/solid-js/i],
        htmlPatterns: [/\$HY\s*=/],
      },
      versionDetect: null,
    },
    {
      name: "Preact",
      category: "frontend-framework",
      icon: "preact",
      detect: {
        globals: ["preact"],
        scriptSrc: [/preact/i],
      },
      versionDetect: (w) => w.preact?.version ?? null,
    },
    {
      name: "Alpine.js",
      category: "frontend-framework",
      icon: "alpinejs",
      detect: {
        domSelectors: ["[x-data]", "[x-init]", "[x-show]"],
        scriptSrc: [/alpinejs/i, /alpine\.min\.js/i],
      },
      versionDetect: null,
    },
    {
      name: "Lit",
      category: "frontend-framework",
      icon: "lit",
      detect: {
        globals: ["litElementVersions"],
        htmlPatterns: [/<!--lit-part/],
        scriptSrc: [/lit-element/i, /lit-html/i, /@lit\//i],
      },
      versionDetect: null,
    },
    {
      name: "Ember.js",
      category: "frontend-framework",
      icon: "ember",
      detect: {
        globals: ["Ember"],
        htmlPatterns: [/ember-application/, /ember-view/],
        scriptSrc: [/ember\.(prod|debug)/i],
      },
      versionDetect: (w) => w.Ember?.VERSION ?? null,
    },
    {
      name: "Qwik",
      category: "frontend-framework",
      icon: "qwik",
      detect: {
        htmlPatterns: [/q:container/, /q:base/, /q:render/],
      },
      versionDetect: null,
    },
    {
      name: "Backbone.js",
      category: "frontend-framework",
      icon: "backbone",
      detect: {
        globals: ["Backbone"],
        scriptSrc: [/backbone(\.min)?\.js/i],
      },
      versionDetect: (w) => w.Backbone?.VERSION ?? null,
    },
    {
      name: "Mithril",
      category: "frontend-framework",
      icon: "mithril",
      detect: {
        // "m" comme global est trop générique — on s'appuie uniquement sur scriptSrc
        scriptSrc: [/mithril/i],
      },
      versionDetect: null,
    },
    {
      name: "Aurelia",
      category: "frontend-framework",
      icon: "aurelia",
      detect: {
        htmlPatterns: [/aurelia-app/],
        scriptSrc: [/aurelia/i],
      },
      versionDetect: null,
    },
    {
      name: "Riot.js",
      category: "frontend-framework",
      icon: "riot",
      detect: {
        globals: ["riot"],
        scriptSrc: [/riot(\.min)?\.js/i],
      },
      versionDetect: (w) => w.riot?.version ?? null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
