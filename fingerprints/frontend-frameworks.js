export const frontendFrameworks = [
  {
    name: "React",
    category: "frontend-framework",
    icon: "react",
    detect: {
      globals: ["React", "__REACT_DEVTOOLS_GLOBAL_HOOK__"],
      domSelectors: ["[data-reactroot]", "[data-reactid]"],
      scriptSrc: [/react-dom/i, /\/react\./i],
    },
    versionDetect: (window) => window.React?.version ?? null,
  },
  {
    name: "Vue",
    category: "frontend-framework",
    icon: "vue",
    detect: {
      globals: ["__VUE__", "Vue"],
      htmlPatterns: [/data-v-[a-f0-9]+/i],
      scriptSrc: [/\/vue(?:\.runtime)?(?:\.esm)?(?:\.min)?\.js/i, /\/vue@/i],
    },
    versionDetect: (window) => window.Vue?.version ?? null,
  },
  {
    name: "Svelte",
    category: "frontend-framework",
    icon: "svelte",
    detect: {
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
      domSelectors: ["[ng-version]", "app-root", "[_nghost-]", "[_ngcontent-]"],
      scriptSrc: [/@angular\//i, /angular\.min\.js/i],
    },
    versionDetect: (window) => {
      const el = document.querySelector("[ng-version]");
      return el ? el.getAttribute("ng-version") : null;
    },
  },
  {
    name: "Solid",
    category: "frontend-framework",
    icon: "solid",
    detect: {
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
    versionDetect: (window) => window.preact?.version ?? null,
  },
];
