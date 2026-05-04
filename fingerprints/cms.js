(() => {
  const entries = [
    {
      name: "WordPress",
      category: "cms",
      icon: "wordpress",
      detect: {
        metaTags: [{ name: "generator", content: /wordpress/i }],
        scriptSrc: [/\/wp-content\//i, /\/wp-includes\//i],
        domSelectors: ["body.wordpress", "body[class*='wp-']"],
      },
      versionDetect: () => {
        const meta = document.querySelector('meta[name="generator"]');
        if (!meta) return null;
        const match = meta.content.match(/wordpress\s+([\d.]+)/i);
        return match ? match[1] : null;
      },
    },
    {
      name: "Shopify",
      category: "cms",
      icon: "shopify",
      detect: {
        globals: ["Shopify"],
        metaTags: [{ name: "generator", content: /shopify/i }],
        headers: [{ name: "x-shopify-stage", value: /.+/ }],
        scriptSrc: [/cdn\.shopify\.com/i],
      },
      versionDetect: null,
    },
    {
      name: "Webflow",
      category: "cms",
      icon: "webflow",
      detect: {
        metaTags: [{ name: "generator", content: /webflow/i }],
        domSelectors: ["[data-wf-site]", "[data-wf-page]"],
        scriptSrc: [/webflow\.js/i, /assets\.website-files\.com/i],
      },
      versionDetect: null,
    },
    {
      name: "Ghost",
      category: "cms",
      icon: "ghost",
      detect: {
        metaTags: [{ name: "generator", content: /ghost/i }],
        scriptSrc: [/ghost\/core/i, /content\/themes\//i],
      },
      versionDetect: () => {
        const meta = document.querySelector('meta[name="generator"]');
        if (!meta) return null;
        const match = meta.content.match(/ghost\s+([\d.]+)/i);
        return match ? match[1] : null;
      },
    },
    {
      name: "Wix",
      category: "cms",
      icon: "wix",
      detect: {
        metaTags: [{ name: "generator", content: /wix\.com/i }],
        scriptSrc: [/static\.parastorage\.com/i, /wix\.com/i],
        htmlPatterns: [/wixsite\.com/i],
      },
      versionDetect: null,
    },
    {
      name: "Squarespace",
      category: "cms",
      icon: "squarespace",
      detect: {
        metaTags: [{ name: "generator", content: /squarespace/i }],
        scriptSrc: [/squarespace\.com/i],
        domSelectors: ["[data-block-type]"],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
