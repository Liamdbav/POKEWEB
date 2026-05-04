console.log("Pokéweb content script injecté sur " + window.location.hostname);

chrome.runtime.sendMessage({ type: "ping" }, (response) => {
  console.log("Pokéweb réponse du background :", response);
});
