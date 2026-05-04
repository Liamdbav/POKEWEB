(() => {
  // Détection backend fragile par nature : on se limite aux signaux à fort ratio signal/bruit.
  // Les headers (x-powered-by) sont capturés côté service worker (background.js),
  // pas depuis le content script dont context.headers = [].
  const entries = [
    {
      name: "Express",
      category: "backend-framework",
      icon: "express",
      detect: {
        headers: [{ name: "x-powered-by", value: /Express/i }],
        cookies: ["connect.sid"],
      },
      versionDetect: null,
    },
    {
      name: "Laravel",
      category: "backend-framework",
      icon: "laravel",
      detect: {
        cookies: ["laravel_session", "XSRF-TOKEN"],
        // csrf-token meta n'est pas exclusif à Laravel — à valider
        metaTags: [{ name: "csrf-token", content: /.+/ }],
      },
      versionDetect: null,
    },
    {
      name: "Django",
      category: "backend-framework",
      icon: "django",
      detect: {
        cookies: ["csrftoken", "sessionid"],
      },
      versionDetect: null,
    },
    {
      name: "Ruby on Rails",
      category: "backend-framework",
      icon: "rails",
      detect: {
        // _rails_session souvent renommé en prod — à valider
        cookies: ["_rails_session"],
        metaTags: [{ name: "csrf-param", content: "authenticity_token" }],
      },
      versionDetect: null,
    },
    {
      name: "ASP.NET",
      category: "backend-framework",
      icon: "aspnet",
      detect: {
        cookies: ["ASP.NET_SessionId", "__RequestVerificationToken"],
        headers: [
          { name: "x-aspnet-version", value: /.+/ },
          { name: "x-powered-by", value: /ASP\.NET/i },
        ],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
