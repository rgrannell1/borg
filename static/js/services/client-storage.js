import { CommonStorageAPI } from "../services/api.js";
import { del, get, set } from "../../vendor/idb-keyval.js";
import { AppEvents } from "../models/app-events.js";
import * as events from "../models/events.js";

export class ClientStorage {
  static async getDatabases() {
    const db = await get("borg_databases");
    return db ?? {};
  }

  static setDatabases(databases) {
    return set("borg_databases", databases);
  }

  static async getDatabaseMaxId(database) {
    const value = await get(`borg_database_${database.alias}_max_id`);
    return value ?? 0;
  }

  static async setDatabaseMaxId(database, maxId) {
    return set(`borg_database_${database.alias}_max_id`, maxId);
  }

  static async getDatabaseContent(database) {
    const val = await get(`borg_database_${database.alias}_content`);
    return val ?? [];
  }

  static async setDatabaseContent(database, content) {
    return set(`borg_database_${database.alias}_content`, content);
  }

  static async getConcepts() {
    const concepts = await get("borg_concepts");
    return concepts ?? [];
  }

  static async setConcepts(concepts) {
    return set("borg_concepts", concepts);
  }

  static async *sync() {
    const databases = await ClientStorage.getDatabases();

    for (const database of Object.values(databases)) {
      console.log(`database: ${database.alias} sync`);

      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password,
      });

      const maxId = await ClientStorage.getDatabaseMaxId(database);
      const currentContent = await ClientStorage.getDatabaseContent(database);

      yield new CustomEvent(AppEvents.DATABASE_SYNCING, {
        detail: { alias: database.alias },
        bubbles: true,
        composed: true,
      });

      let contentId = maxId;

      for await (const content of client.getContent(database.topic, maxId)) {
        currentContent.push(content.value);
        contentId = content.id;
      }

      await ClientStorage.setDatabaseContent(database, currentContent);
      await ClientStorage.setDatabaseMaxId(database, contentId);

      yield new CustomEvent(AppEvents.DATABASE_SYNCED, {
        detail: { alias: database.alias },
        bubbles: true,
        composed: true,
      });
    }
  }

  static async writeCard(database, url) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postContent(database.topic,
      events.AddBookmark(url));
  }

  static async clearCards(database) {
    await del(`borg_database_${database.alias}_content`);
    await del(`borg_database_${database.alias}_max_id`);
  }
}
