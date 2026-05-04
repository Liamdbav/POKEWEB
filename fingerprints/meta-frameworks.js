export const metaFrameworks = [
  {
    name: "Next.js",
    category: "meta-framework",
    icon: "nextjs",
    detect: {
      globals: ["__NEXT_DATA__"],
      scriptSrc: [/_next\/static\//i],
      headers: [{ name: "x-powered-by", value: /next\.js/i }],
    },
    versionDetect: (window) => window.__NEXT_DATA__?.buildId ?? null,
  },
  {
    name: "Nuxt",
    category: "meta-framework",
    icon: "nuxt",
    detect: {
      globals: ["__NUXT__"],
      scriptSrc: [/_nuxt\//i],
    },
    versionDetect: null,
  },
  {
    name: "Remix",
    category: "meta-framework",
    icon: "remix",
    detect: {
      globals: ["__remixContext"],
      scriptSrc: [/@remix-run\//i, /\/build\/root-/i],
    },
    versionDetect: null,
  },
  {
    name: "Astro",
    category: "meta-framework",
    icon: "astro",
    detect: {
      domSelectors: ["astro-island", "[data-astro-source-file]"],
      htmlPatterns: [/<astro-island/i],
      scriptSrc: [/\/_astro\//i],
    },
    versionDetect: null,
  },
  {
    name: "SvelteKit",
    category: "meta-framework",
    icon: "sveltekit",
    detect: {
      globals: ["__sveltekit_"],
      scriptSrc: [/\/_app\/immutable\//i],
    },
    versionDetect: null,
  },
  {
    name: "Gatsby",
    category: "meta-framework",
    icon: "gatsby",
    detect: {
      globals: ["___gatsby"],
      scriptSrc: [/gatsby/i],
      metaTags: [{ name: "generator", content: /gatsby/i }],
    },
    versionDetect: null,
  },
];
