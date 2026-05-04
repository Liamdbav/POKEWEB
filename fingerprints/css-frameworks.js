(() => {
  const entries = [
    {
      name: "Tailwind CSS",
      category: "css-framework",
      icon: "tailwind",
      detect: {
        // détection par URL de stylesheet en V1 — détection par classes utilitaires en V2
        scriptSrc: [/tailwindcss/i],
        htmlPatterns: [/tailwindcss/i],
      },
      versionDetect: null,
    },
    {
      name: "Bootstrap",
      category: "css-framework",
      icon: "bootstrap",
      detect: {
        domSelectors: [".container", ".navbar", ".btn"],
        scriptSrc: [/bootstrap(?:\.min)?\.js/i, /bootstrap@/i],
        htmlPatterns: [/bootstrap(?:\.min)?\.css/i],
      },
      versionDetect: null,
    },
    {
      name: "Bulma",
      category: "css-framework",
      icon: "bulma",
      detect: {
        domSelectors: [".is-primary", ".has-text-centered", ".columns"],
        htmlPatterns: [/bulma(?:\.min)?\.css/i, /bulma@/i],
        scriptSrc: [/bulma/i],
      },
      versionDetect: null,
    },
    {
      name: "Chakra UI",
      category: "css-framework",
      icon: "chakra",
      detect: {
        domSelectors: ["[data-theme]", "[class*='chakra-']"],
        htmlPatterns: [/chakra-ui/i],
        scriptSrc: [/@chakra-ui\//i],
      },
      versionDetect: null,
    },
    {
      name: "Material UI",
      category: "css-framework",
      icon: "mui",
      detect: {
        domSelectors: ["[class*='MuiButton-']", "[class*='MuiTypography-']", "[class*='MuiBox-']"],
        scriptSrc: [/@mui\//i, /material-ui/i],
      },
      versionDetect: null,
    },
  ];

    {
      name: "Foundation",
      category: "css-framework",
      icon: "foundation",
      detect: {
        htmlPatterns: [/foundation\.(min\.)?css/i],
        domSelectors: [".grid-x", ".cell"],
        scriptSrc: [/foundation\.min\.js/i, /foundation\.js/i],
      },
      versionDetect: null,
    },
    {
      name: "Ant Design",
      category: "css-framework",
      icon: "antdesign",
      detect: {
        domSelectors: [".ant-btn", ".ant-layout", "[class^='ant-']"],
        htmlPatterns: [/ant-design/i],
        scriptSrc: [/antd/i, /@ant-design\//i],
      },
      versionDetect: null,
    },
    {
      name: "Framer Motion",
      category: "css-framework",
      icon: "framermotion",
      detect: {
        htmlPatterns: [/data-framer-/],
        scriptSrc: [/framer-motion/i],
      },
      versionDetect: null,
    },
    {
      name: "Styled Components",
      category: "css-framework",
      icon: "styledcomponents",
      detect: {
        htmlPatterns: [/data-styled/],
        // [class^='sc-'] peut produire des faux positifs avec d'autres libs
        domSelectors: ["[data-styled]"],  // à valider — prefer data-styled attribute
        scriptSrc: [/styled-components/i],
      },
      versionDetect: null,
    },
    {
      name: "Emotion",
      category: "css-framework",
      icon: "emotion",
      detect: {
        htmlPatterns: [/data-emotion/],
        scriptSrc: [/@emotion\//i],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
