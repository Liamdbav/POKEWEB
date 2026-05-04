(() => {
  // Détection 100% via headers HTTP — jamais matchée dans le content script
  // (context.headers = []). Ces fingerprints sont capturées côté service worker
  // via la copie dans background.js headerFingerprints.
  const entries = [
    {
      name: "Nginx",
      category: "web-server",
      icon: "nginx",
      detect: {
        headers: [{ name: "server", value: /nginx/i }],
      },
      versionDetect: null,
    },
    {
      name: "Apache",
      category: "web-server",
      icon: "apache",
      detect: {
        headers: [{ name: "server", value: /apache/i }],
      },
      versionDetect: null,
    },
    {
      name: "Caddy",
      category: "web-server",
      icon: "caddy",
      detect: {
        headers: [{ name: "server", value: /caddy/i }],
      },
      versionDetect: null,
    },
    {
      name: "LiteSpeed",
      category: "web-server",
      icon: "litespeed",
      detect: {
        headers: [{ name: "server", value: /litespeed/i }],
      },
      versionDetect: null,
    },
    {
      name: "Microsoft IIS",
      category: "web-server",
      icon: "iis",
      detect: {
        headers: [{ name: "server", value: /Microsoft-IIS/i }],
      },
      versionDetect: null,
    },
    {
      name: "Varnish",
      category: "web-server",
      icon: "varnish",
      detect: {
        headers: [
          { name: "x-varnish", value: /.+/ },
          { name: "via", value: /varnish/i },
        ],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
