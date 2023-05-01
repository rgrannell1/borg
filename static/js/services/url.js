import { ComponentPaths } from "../models/components.js";

export class UrlRoute {
  static getState() {
    return {};
  }
  static setState(params) {
    const url = new URL(location);

    for (const [key, value] of Object.entries(params)) {
      if (key === "page" || key === "topic") {
        continue;
      }

      url.searchParams.set(key, value);
    }

    if (params.page) {
      url.hash = params.topic
        ? `#${ComponentPaths[params.page]}/${params.topic}`
        : `#${ComponentPaths[params.page]}`;
    }

    history.pushState({}, "", url);
  }
}
