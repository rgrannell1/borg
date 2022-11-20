import { HttpPublisher, PluginPublisher } from "../../js/publisher.js";
import { selectionBookmark } from "../../js/bookmark.js";

const publisher = new PluginPublisher({
  webhooks: [
    new HttpPublisher({
      url: "https://mycloud.rgrannell.xyz/",
    }),
  ],
});

console.log("borg: loading");
const elem = document.querySelector("#save-bookmark");

elem.addEventListener("click", async () => {
  elem.innerText = 'Assimilating...'

  const settings = await chrome.action.getUserSettings();
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (tabs.length > 0) {
    const body = await selectionBookmark(tabs[0]);

    try {
      await publisher.send(body);
    } catch (err) {
      elem.innerText = 'Failed'
      throw err;
    }
    elem.innerText = 'Assimilate'
  } else {
    console.error("borg: no tabs loaded");
  }
});
