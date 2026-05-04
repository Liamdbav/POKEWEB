(() => {
  const entries = [
    {
      name: "Google Analytics",
      category: "analytics",
      icon: "googleanalytics",
      detect: {
        globals: ["ga", "gtag", "dataLayer"],
        scriptSrc: [/googletagmanager\.com\/gtag/i, /google-analytics\.com\/analytics/i],
      },
      versionDetect: null,
    },
    {
      name: "Plausible",
      category: "analytics",
      icon: "plausible",
      detect: {
        scriptSrc: [/plausible\.io\/js\//i],
        domSelectors: ["script[data-domain][src*='plausible']"],
      },
      versionDetect: null,
    },
    {
      name: "Fathom",
      category: "analytics",
      icon: "fathom",
      detect: {
        scriptSrc: [/usefathom\.com\/script\.js/i, /cdn\.usefathom\.com/i],
        domSelectors: ["script[data-site][src*='fathom']"],
      },
      versionDetect: null,
    },
    {
      name: "PostHog",
      category: "analytics",
      icon: "posthog",
      detect: {
        globals: ["posthog"],
        scriptSrc: [/posthog\.com\/static\//i, /us\.i\.posthog\.com/i],
      },
      versionDetect: null,
    },
    {
      name: "Mixpanel",
      category: "analytics",
      icon: "mixpanel",
      detect: {
        globals: ["mixpanel"],
        scriptSrc: [/cdn\.mxpnl\.com/i, /cdn\.mixpanel\.com/i],
      },
      versionDetect: null,
    },
    {
      name: "Hotjar",
      category: "analytics",
      icon: "hotjar",
      detect: {
        globals: ["hj", "_hjSettings"],
        scriptSrc: [/static\.hotjar\.com/i, /script\.hotjar\.com/i],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
