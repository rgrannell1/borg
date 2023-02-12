
export class BorgCache {
  constructor(topics, client) {
    this.topics = topics;
    this.client = client;
    this.events = new Map();
  }
  async init() {
  }

  async maxId(topic) {
    return 0;
  }

  async sync() {
    for (const topic of this.topics) {

    }
  }

  async *getContent(topic) {
    const startId = await this.maxId(topic);

    yield* this.client.getContent(topic, startId);
  }
}
