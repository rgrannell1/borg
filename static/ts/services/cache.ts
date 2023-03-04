import { CommonStorageAPI } from "./api.js";

import type { DatabaseRecord } from "../types.js";

export class BorgCache {
  static BORG_DATABASES_KEY = "borg_databases";

  constructor() {

  }

  async init() {

  }

  static getDatabases(): DatabaseRecord {
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

  static setDatabases(databases: DatabaseRecord) {
    localStorage.setItem(BorgCache.BORG_DATABASES_KEY, JSON.stringify(databases));
  }

  /*
   * Sync all databases into the local IDB store
   *
   */
  async sync() {
    const databases = BorgCache.getDatabases();

    for (const database of Object.values(databases)) {
      console.log(database)

      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password
      });

      for await (const content of client.getContent(database.topic, 0)) {
        console.log(content);
      }
    }

  }
}
