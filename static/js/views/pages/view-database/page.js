import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { ClientStorage } from "../../../services/client-storage.js";
import { Assembler } from "../../../services/assembler.js";
import { DateTime } from "../../../models/datetime.js";

import './components/date.js';
import './components/card.js';

export class SearchBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <input id="search-cards" class="borg-input" placeholder="Search" />
    `;
  }
}

export class ViewDatabaseCards extends LitElement {
  static get properties() {
    return {
      database: { type: Object },
      content: { type: Array },
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

    this.content = Assembler.assembleBookmarks(
      await ClientStorage.getDatabaseContent(this.database)
    );

    this.requestUpdate();
  }

  renderDate(date) {
    return html`
    <li>
      <date-summary .date=${date}></date-summary>
    </li>
    `;
  }

  renderCard(entry) {
    return html`
    <li>
      <borg-card .content=${entry}></borg-card>
    </li>
    `;
  }

  render() {
    const entries = [];
    let lastDate = undefined;

    for (const entry of this.content) {
      const date = entry.created_at;

      // buggy
      const createdAt = DateTime.formatDate(new Date(date));
      const previousDate = DateTime.formatDate(new Date(lastDate));

      if (createdAt !== previousDate) {
        entries.push(this.renderDate(date));
        lastDate = date;
      }

      entries.push(this.renderCard(entry));
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

    await ClientStorage.sync();
    this.requestUpdate();
  }

  onSubmit() {

  }

  render() {
    return html`
    <borg-search-bar></borg-search-bar>

    <borg-view-database-cards .database=${this.database}></borg-view-database-cards>

    <section class="input-card">
      <input id="bookmark-url" type="url" class="borg-input" placeholder="URL" />
      <input @submit=${this.onSubmit} class="submit-button" type="button" value="▷"/>
    </section>
    `;
  }
}

customElements.define("borg-search-bar", SearchBar);
customElements.define("borg-view-database-cards", ViewDatabaseCards);
customElements.define("borg-view-database-page", ViewDatabasePage);
