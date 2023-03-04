
import { get, set } from '../../vendor/idb-keyval.js';

export class ClientStorage {
  static async getDatabases() {
    const db = await get('borg_databases');
    return db ?? {};
  }

  static setDatabases(databases) {
    return set('borg_databases', databases);
  }
}
