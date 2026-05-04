// Chargé après les fingerprints et detector.js — window.PokewebFingerprints et
// window.PokewebDetector sont garantis présents à ce stade.
const { runDetection, buildContextFromDOM } = window.PokewebDetector;

const context = buildContextFromDOM(window.PokewebFingerprints);
const results = runDetection(context, window.PokewebFingerprints);

console.log(
  `Pokéweb — ${results.length} techno(s) détectée(s) sur ${window.location.hostname} :`,
  results
);

chrome.runtime.sendMessage(
  { type: "detection-result", url: location.href, results },
  () => { if (chrome.runtime.lastError) {} }
);
