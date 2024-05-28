chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const chatgpt = "https://chatgpt.com";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(chatgpt)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["line.css"],
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["line.css"],
      });
    }
  }
});
