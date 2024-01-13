export class CommonStorageAPI {
  static TOPIC_BOOKMARKS = "bookmarks";

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

  async postTopic(topic) {
    try {
      const res = await fetch(`${this.endpoint}/topic/${topic}`, {
        method: "post",
        mode: "cors",
        headers: this.headers(),
        body: JSON.stringify({
          description: "A topic created by borg",
        }),
      });

      const status = res.status;

      if (status === 401) {
        return {
          state: "unauthorised",
        };
      } else if (status === 200) {
        return {
          state: "ok",
        };
      } else {
        return {
          state: "error",
          reason: `Unexpected status code: ${status}`,
        };
      }
    } catch (err) {
      return {
        state: "error",
        reason: err,
      };
    }
  }

  async postContent(topic, content) {
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

      if (status === 401) {
        return {
          state: "unauthorised",
        };
      } else if (status === 200) {
        const body = await res.json();
        return {
          state: "ok",
          total: body.stats.total,
        };
      } else {
        return {
          state: "error",
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
    while (true) {
      console.log(`fetching from ${startId}`);

      const params = typeof startId !== "undefined"
        ? `?startId=${startId}`
        : "";

      const res = await fetch(`${this.endpoint}/content/${topic}${params}`, {
        mode: "cors",
        headers: this.headers(),
      });

      const data = await res.json();
      if (data.content.length === 0) {
        break;
      }

      for (const content of data.content) {
        yield content;
      }

      if (data.nextId === startId) {
        break;
      }

      startId = data.nextId;
    }
  }
}
