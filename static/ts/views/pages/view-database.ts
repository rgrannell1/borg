import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { BorgCache } from '../../services/cache.js';
import { CommonStorageAPI } from '../../services/api.js';

export class ViewDatabasePage extends LitElement {
  database: any;

  static get properties() {
    return {
      database: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  foo() {
    const db = this.database;
    const client = new CommonStorageAPI(db.url, {
      username: db.username,
      password: db.password
    });
    const cache = new BorgCache(db.topic, client)
  }

  render() {
    this.foo();

    return html`
    <div>
      <section class="cards">

      </section>

      <section class="input-card">

      </section>
    </div>
    `
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage as LitElement);
