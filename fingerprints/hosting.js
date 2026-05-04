// Détection hosting : basée exclusivement sur les headers HTTP.
// Le content script construit le contexte avec headers: [] — ces fingerprints
// ne matcheront qu'après fusion par le service worker (background.js).
(() => {
  const entries = [
    {
      name: "Vercel",
      category: "hosting",
      icon: "vercel",
      detect: {
        headers: [
          { name: "x-vercel-id", value: /.+/ },
          { name: "server", value: /vercel/i },
        ],
      },
      versionDetect: null,
    },
    {
      name: "Netlify",
      category: "hosting",
      icon: "netlify",
      detect: {
        headers: [
          { name: "x-nf-request-id", value: /.+/ },
          { name: "server", value: /netlify/i },
        ],
      },
      versionDetect: null,
    },
    {
      name: "Cloudflare",
      category: "hosting",
      icon: "cloudflare",
      detect: {
        headers: [
          { name: "cf-ray", value: /.+/ },
          { name: "server", value: /cloudflare/i },
        ],
      },
      versionDetect: null,
    },
    {
      name: "AWS CloudFront",
      category: "hosting",
      icon: "cloudfront",
      detect: {
        headers: [
          { name: "x-amz-cf-id", value: /.+/ },
          { name: "via", value: /cloudfront/i },
        ],
      },
      versionDetect: null,
    },
    {
      name: "GitHub Pages",
      category: "hosting",
      icon: "github",
      detect: {
        headers: [
          { name: "x-github-request-id", value: /.+/ },
          { name: "server", value: /github\.com/i },
        ],
      },
      versionDetect: null,
    },
    {
      name: "Fastly",
      category: "hosting",
      icon: "fastly",
      detect: {
        headers: [
          { name: "x-served-by", value: /cache-[a-z]+-fastly/i },
          { name: "x-fastly-request-id", value: /.+/ },
        ],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
