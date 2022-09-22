/*
 * Publish an event to multiple webhook endpoints
 *
 */
export class PluginPublisher {
  constructor(opts) {
    this.webhooks = opts.webhooks;
  }

  async send(body) {
    for (const webhook of this.webhooks) {
      const res = await webhook.send(body);
    }
  }
}

/*
 * Publish some information to an endpoint using HTTP POST
 *
 */
export class HttpPublisher {
  constructor(opts) {
    this.url = opts.url;
  }
  async send(body) {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    return fetch(this.url, {
      method: "POST",
      mode: "no-cors",
      headers,
      body: JSON.stringify(body),
    });
  }
}
