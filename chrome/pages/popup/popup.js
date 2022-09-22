import { HttpPublisher, PluginPublisher } from "../../js/publisher.js";
import { selectionBookmark } from "../../js/bookmark.js";

const publisher = new PluginPublisher({
  webhooks: [
    new HttpPublisher({
      url: "https://rgrannell.xyx/api/things",
    }),
  ],
});

console.log("borg: loading");
const elem = document.querySelector("#save-bookmark");

elem.addEventListener("click", async () => {
  const settings = await chrome.action.getUserSettings();
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (tabs.length > 0) {
    const body = await selectionBookmark(tabs[0]);

    await publisher.send(body);
  } else {
    console.error("no tabs loaded");
  }
});
