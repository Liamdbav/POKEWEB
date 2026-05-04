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

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
