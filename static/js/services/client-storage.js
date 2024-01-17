import { CommonStorageAPI } from "../services/api.js";
import { del, get, set } from "../../vendor/idb-keyval.js";
import { AppEvents } from "../models/app-events.js";
import * as events from "../models/events.js";

class ClientStorageEvents {
  static databaseSyncing(alias, maxId) {
    return new CustomEvent(AppEvents.DATABASE_SYNCING, {
      detail: {
        alias,
        maxId,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }

  static databaseSynced(alias) {
    return new CustomEvent(AppEvents.DATABASE_SYNCED, {
      detail: {
        alias,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }

  static databaseSyncError(database, maxId, error) {
    return new CustomEvent(AppEvents.DATABASE_SYNC_ERROR, {
      detail: {
        database,
        maxId,
        error,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }
}

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

  static async databaseFetch() {
  }

  static async getConcepts() {
    const concepts = await get("borg_concepts");
    return concepts ?? [];
  }

  static async setConcepts(concepts) {
    return set("borg_concepts", concepts);
  }

  static async *sync() {
    // TODO: block when sync is initialised for a topic

    const databases = await ClientStorage.getDatabases();

    for (const database of Object.values(databases)) {
      console.log(`database: ${database.alias} sync`);

      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password,
      });

      const maxId = await ClientStorage.getDatabaseMaxId(database);
      const currentContent = await ClientStorage.getDatabaseContent(database);

      // announce we are syncing
      yield ClientStorageEvents.databaseSyncing(database.alias, maxId);

      let contentId = maxId;

      try {
        for await (const {content, nextId} of client.getContent(database.topic, maxId)) {
          currentContent.push(content);
          contentId = nextId;

          // periodically update to show sync-status
          if (contentId % 250 === 0) {
            yield ClientStorageEvents.databaseSyncing(
              database.alias,
              contentId,
            );
          }
        }
      } catch (err) {
        yield ClientStorageEvents.databaseSyncError(database, contentId, err);
        continue;
      }

      await ClientStorage.setDatabaseContent(database, currentContent);
      await ClientStorage.setDatabaseMaxId(database, contentId);

      // announce we are done syncing this database
      yield ClientStorageEvents.databaseSynced(database.alias);
    }
  }

  static async writeTopic(database, topic) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postTopic(topic);
  }

  static async writeCard(database, url) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postContent(database.topic, events.AddBookmark(url));
  }

  static async deleteCard(database, id) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postContent(database.topic, events.DeleteBookmark(id));
  }

  static async clearCards(database) {
    await del(`borg_database_${database.alias}_content`);
    await del(`borg_database_${database.alias}_max_id`);
  }
}
