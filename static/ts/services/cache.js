import { CommonStorageAPI } from "./api.js";

export class BorgCache {
  constructor() {
  }

  async init() {
  }

  /*
   * Sync all databases into the local IDB store
   */
  async sync() {
    const databases = BorgCache.getDatabases();

    for (const database of Object.values(databases)) {
      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password,
      });

      for await (const content of client.getContent(database.topic, 0)) {
      }
    }
  }
}
