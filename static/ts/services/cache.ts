import { CommonStorageAPI } from "./api.js";

export class BorgCache {
  topics: string[];
  client: CommonStorageAPI;
  events: Map<string, EventSource>;

  static BORG_DATABASES_KEY = "borg_databases";

  constructor(topics, client) {
    this.topics = topics;
    this.client = client;
    this.events = new Map();
  }
  async init() {

  }

  static getDatabases() {
    const value = localStorage.getItem(BorgCache.BORG_DATABASES_KEY);

    if (!value) {
      return {}
    } else {
      try {
        return JSON.parse(value);
      } catch (err) {
        return {}
      }
    }
  }

  static setDatabases(databases: Record<string, any>) {
    localStorage.setItem(BorgCache.BORG_DATABASES_KEY, JSON.stringify(databases));
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
