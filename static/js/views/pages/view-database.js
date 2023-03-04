import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { ClientStorage } from '../../services/client-storage.js';
import { Assembler } from '../../services/assembler.js';
import { DateTime } from '../../models/datetime.js';

export class DateSummary extends LitElement {
  static get properties() {
    return {
      date: { type: String }
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <section class="date-summary">
      <p>${ this.date }</p>
    </section>
    `
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

    let state = undefined;
    for (const entry of this.content) {
      const date = entry.created_at;

      // buggy
      const formattedCreatedAt = DateTime.formatDate(new Date(date))
      const formattedPreviousDate = DateTime.formatDate(new Date(state))

      if (formattedCreatedAt !== formattedPreviousDate) {
        entries.push(html`<date-summary .date=${date}></date-summary>`)
        state = date;
      }

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

customElements.define("borg-view-database-cards", ViewDatabaseCards);
customElements.define("borg-view-database-page", ViewDatabasePage);
