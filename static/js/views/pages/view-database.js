import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { ClientStorage } from '../../services/client-storage.js';
import { Assembler } from '../../services/assembler.js';
import { DateTime } from '../../models/datetime.js';

export class Card extends LitElement {
  static get properties() {
    return {
      content: { type: Object }
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const date = new Date(this.content.created_at);

    return html`
    <section class="card">
      <p>
        <a href=${this.content.url}>${this.content.url}</a>
      </p>
      <br/>
      <p>${DateTime.formatTime(date)}</p>
    </section>
    `;
  }
}

export class ViewDatabaseCards extends LitElement {
  static get properties() {
    return {
      database: { type: Object },
      content: { type: Array }
    };
  }

  constructor() {
    super();
    this.content = [];
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    if (!this.database) {
      return;
    }

    this.entries = [];
    for  (const entry of await ClientStorage.getDatabaseContent(this.database)) {
      this.entries.push(entry);
    }

    this.content = Assembler.assembleBookmarks(this.entries);
    this.requestUpdate();
  }

  render() {
    const entries = [];

    for (const entry of this.content) {
      const elem = html`
      <li>
        <borg-card .content=${entry}></borg-card>
      </li>`;

      entries.push(elem);
    }

    return html`
    <ol class="cards">
      ${entries}
    </ol>
    `;
  }
}

export class ViewDatabasePage extends LitElement {
  static get properties() {
    return {
      database: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    // show in syncing state
    await ClientStorage.sync();
  }

  render() {
    return html`
    <borg-view-database-cards .database=${this.database}></borg-view-database-cards>
    <section class="input-card"></section>
    `;
  }
}

customElements.define("borg-card", Card);
customElements.define("borg-view-database-cards", ViewDatabaseCards);
customElements.define("borg-view-database-page", ViewDatabasePage);
