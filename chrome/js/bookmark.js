import { BORG_BOOKMARK_TYPE } from "./constants.js";

/*
 * Publish some information over HTTP POST
 *
 */
export function selectionBookmark() {
  const now = new Date();
  const id = `urn:borg_bookmark:${now.getTime()}`;
  const url = window.location.href;
  const selection = window.getSelection().toString();

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
      created_at: now.toISOString()
    }),
  };
}
