/*
 * Wired up to detect triple-comma keypresses and
 * emit a `borg-triple-tap` event. This event is listened for, and each webhook is
 * contacted with cloudevent format bookmark information
 *
 */

import { PluginPublisher } from "./publisher.js.js";

import { emitTripleTap } from "./events.js.js";
import { BORG_SELECTION, BORG_TRIPLE_TAP } from "./constants.js.js";
import { selectionBookmark } from "./bookmark.js.js";
import { userConfig } from "./user-config.js.js";

export class BorgPlugin {
  static #loaded = false;

  static description = "A selection Plugin";
  static load() {
    console.debug("borg: loading plugin");

    if (this.loaded) {
      return;
    }
    const cfg = userConfig()
    const publisher = new PluginPublisher({
      webhooks: cfg.webhooks
    });

    document.addEventListener(
      "keypress",
      emitTripleTap({
        id: BORG_SELECTION,
        key: ",",
        maxInterval: 350,
      }),
    );

    document.addEventListener(BORG_TRIPLE_TAP, async (event) => {
      if (event.detail.id !== BORG_SELECTION) {
        return;
      }
      const body = selectionBookmark();
      await publisher.send(body);
    });

    this.loaded = true;
  }
}

BorgPlugin.load();
