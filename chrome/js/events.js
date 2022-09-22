import { BORG_TRIPLE_TAP } from "./constants.js.js.js";

export function emitTripleTap(opts) {
  // store tripletap state for now, move later
  const state = {
    count: 0,
    lastPressTime: 0,
  };

  function isRecent() {
    return Date.now() - state.lastPressTime < opts.maxInterval;
  }

  return async (event) => {
    if (event.key !== opts.key) {
      return;
    }

    const count = state.count;
    if (count === 0) {
      state.count++;
      state.lastPressTime = Date.now();
      return;
    }

    if (count === 1 || count === 2) {
      if (isRecent()) {
        state.count++;
      } else {
        state.count = 0;
      }
      state.last = Date.now();
    } else if (count === 3) {
      state.count = 0;
      state.last = Date.now();

      const event = new CustomEvent(BORG_TRIPLE_TAP, {
        detail: { id: opts.id },
      });

      console.debug(`borg: sending ${BORG_TRIPLE_TAP} event`);
      document.dispatchEvent(event);
    }
  };
}
