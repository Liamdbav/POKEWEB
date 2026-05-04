// Moteur de détection — chargé comme script ordinaire dans les content scripts.
// Pas d'export ES6 : les content scripts MV3 ne supportent pas type="module".
// Exposé via window.PokewebDetector pour content.js.
(() => {
  function matchesHeader(headers, { name, value }) {
    const h = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    if (!h) return false;
    return value instanceof RegExp ? value.test(h.value) : h.value === value;
  }

  function matchesMetaTag(metaTags, { name, content }) {
    return metaTags.some(tag => {
      if (tag.name.toLowerCase() !== name.toLowerCase()) return false;
      return content instanceof RegExp ? content.test(tag.content) : tag.content === content;
    });
  }

  function runDetection(context, fingerprints) {
    const results = [];

    for (const fp of fingerprints) {
      const d = fp.detect;
      let matched = false;

      if (!matched && d.globals?.length)
        matched = d.globals.some(g => context.globals.includes(g));

      if (!matched && d.metaTags?.length)
        matched = d.metaTags.some(m => matchesMetaTag(context.metaTags, m));

      if (!matched && d.htmlPatterns?.length)
        matched = d.htmlPatterns.some(rx => rx.test(context.htmlSnippet));

      if (!matched && d.scriptSrc?.length)
        matched = d.scriptSrc.some(rx => context.scriptSrcs.some(src => rx.test(src)));

      if (!matched && d.headers?.length)
        matched = d.headers.some(h => matchesHeader(context.headers, h));

      if (!matched && d.cookies?.length)
        matched = d.cookies.some(c => context.cookieNames.includes(c));

      if (!matched && d.domSelectors?.length)
        matched = d.domSelectors.some(sel => context.domSelectorMatches[sel] === true);

      if (!matched) continue;

      let version = null;
      if (fp.versionDetect) {
        try { version = fp.versionDetect(window) ?? null; } catch (_) {}
      }

      results.push({ name: fp.name, category: fp.category, icon: fp.icon, version });
    }

    return results;
  }

  // Construit le contexte de détection depuis le DOM de la page courante.
  // Les headers sont absents ici — le service worker les complète via webRequest.
  function buildContextFromDOM(allFingerprints) {
    const watchedGlobals = [...new Set(
      allFingerprints.flatMap(fp => fp.detect.globals ?? [])
    )];

    const globals = watchedGlobals.filter(key => {
      try { return key in window; } catch (_) { return false; }
    });

    const metaTags = Array.from(
      document.querySelectorAll('meta[name][content]')
    ).map(el => ({
      name: el.getAttribute('name'),
      content: el.getAttribute('content'),
    }));

    const htmlSnippet = document.documentElement.outerHTML.slice(0, 50000);

    const scriptSrcs = Array.from(
      document.querySelectorAll('script[src]')
    ).map(s => s.src);

    const cookieNames = document.cookie
      ? document.cookie.split(';').map(c => c.trim().split('=')[0].trim()).filter(Boolean)
      : [];

    const allSelectors = [...new Set(
      allFingerprints.flatMap(fp => fp.detect.domSelectors ?? [])
    )];

    const domSelectorMatches = {};
    for (const sel of allSelectors) {
      try { domSelectorMatches[sel] = !!document.querySelector(sel); }
      catch (_) { domSelectorMatches[sel] = false; }
    }

    return {
      globals,
      metaTags,
      htmlSnippet,
      scriptSrcs,
      headers: [],
      cookieNames,
      domSelectorMatches,
    };
  }

  window.PokewebDetector = { runDetection, buildContextFromDOM };
})();
