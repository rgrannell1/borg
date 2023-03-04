import { CommonStorageAPI } from "../services/api.js";
import { get, set } from "../../vendor/idb-keyval.js";
import { LitEvents } from "../models/lit-events.js";

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

  static broadcastSyncing(alias) {
    const event = new CustomEvent(LitEvents.DATABASE_SYNCING, {
      detail: { alias },
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  }

  static broadcastSynced(alias) {
    const event = new CustomEvent(LitEvents.DATABASE_SYNCED, {
      detail: { alias },
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  }

  static async sync() {
    const databases = await ClientStorage.getDatabases();

    for (const database of Object.values(databases)) {
      console.log(`database: ${database.alias} sync`);

      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password,
      });

      const maxId = await ClientStorage.getDatabaseMaxId(database);
      const currentContent = await ClientStorage.getDatabaseContent(database);

      ClientStorage.broadcastSyncing(database.alias);

      for await (const content of client.getContent(database.topic, maxId)) {
        currentContent.push(content.value);

        await ClientStorage.setDatabaseMaxId(database, content.id);
        await ClientStorage.setDatabaseContent(database, currentContent);
      }

      ClientStorage.broadcastSynced(database.alias);
    }
  }
}
