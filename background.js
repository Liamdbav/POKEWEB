console.log("Pokéweb service worker actif");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message reçu depuis", sender.tab?.url, ":", message);
  sendResponse({ pong: true });
  return true;
});
