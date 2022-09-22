/*
 * Publish some information over HTTP POST
 *
 */
export async function selectionBookmark(tab) {
  const now = new Date();
  const id = `urn:borg_bookmark:${now.getTime()}`;
  const url = tab.url;

  const selection = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func() {
      return window.getSelection().toString();
    },
  });

  return {
    source: "https://github.com/rgrannell1/borg/spec/bookmark.json",
    id,
    time: (new Date()).toISOString(),
    type: "xyz.rgrannell.borg_bookmark.add.v1",
    specversion: "1.0",
    datacontenttype: "application/json",
    data: JSON.stringify({
      url,
      id,
      selection,
      created_at: now.toISOString(),
    }),
  };
}
