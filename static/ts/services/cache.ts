import { CommonStorageAPI } from "./api.js";

export class BorgCache {
  topics: string[];
  client: CommonStorageAPI;
  events: Map<string, EventSource>;

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
