import { Status } from "../models/status.js";
import { AddBookmarkStates } from "../models/add-bookmark-states.js";

export class CommonStorageAPI {
  static TOPIC_BOOKMARKS = "bookmarks";

  constructor(endpoint, credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
  }

  async postContent(topic, content) {
    try {
      const body = JSON.stringify({
        content: [content],
      });

      const {username, password} = this.credentials;

      const res = await fetch(`${this.endpoint}/content/${topic}`, {
        method: "post",
        mode: "cors",
        headers: new Headers({
          "content-type": "application/json",
          authorization: `Basic ${window.btoa(username + ":" + password)}`,
        }),
        body,
      });

      const status = res.status;

      if (status === Status.UNAUTHORIZED) {
        return {
          state: AddBookmarkStates.UNAUTHORIZED,
        };
      } else if (status === Status.OK) {
        const body = await res.json();
        return {
          state: AddBookmarkStates.OK,
          total: body.stats.total,
        };
      } else {
        return {
          state: AddBookmarkStates.ERROR,
        };
      }
    } catch (err) {
      console.error(err);
      return {
        state: AddBookmarkStates.ERROR,
      };
    }
  }
}
