import { Status } from "../models/status.js";
import { AddBookmarkStates } from "../models/add-bookmark-states.js";

export class CommonStorageAPI {
  static TOPIC_BOOKMARKS = "bookmarks";
  endpoint: string;
  credentials: { username: string; password: string };

  constructor(endpoint, credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
  }

  headers() {
    const { username, password } = this.credentials;

    return new Headers({
      "content-type": "application/json",
      authorization: `Basic ${btoa(username + ":" + password)}`,
    });
  }

  async postContent<T>(topic: string, content: T) {
    try {
      const body = JSON.stringify({
        content: [content],
      });

      const res = await fetch(`${this.endpoint}/content/${topic}`, {
        method: "post",
        mode: "cors",
        headers: this.headers(),
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

  async *getContent(topic, startId) {
    const params = typeof startId !== "undefined" ? `?startId=${startId}` : "";

    const res = await fetch(`${this.endpoint}/content/${topic}${params}`, {
      mode: "cors",
      headers: this.headers(),
    });

    // console.log(await res.text());
  }
}
