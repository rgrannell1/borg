import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { ClientStorage } from "../../../../services/client-storage.js";
import { Assembler } from "../../../../services/assembler.js";
import { DateTime } from "../../../../models/datetime.js";

export class CardsPanel extends LitElement {
  static get properties() {
    return {
      page: { type: Number },
      query: { type: String },
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
      await ClientStorage.getDatabaseContent(this.database),
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

  matchesSet(entry) {
    if (!this.query) {
      return true;
    }

    return entry.url.toLowerCase().includes(this.query);
  }

  render() {
    const entries = [];
    let lastDate = undefined;

    const skip = (this.page ?? 0) * 50;

    let idx = 0;
    for (const entry of this.content) {
      idx++;

      if (idx < skip) {
        //continue;
      }

      if (idx > skip + 50) {
        //break;
      }

      if (!this.matchesSet(entry)) {
        continue;
      }

      const date = entry.created_at;

      // buggy
      const createdAt = DateTime.formatDate(new Date(date));
      const previousDate = DateTime.formatDate(new Date(lastDate));

      if (createdAt !== previousDate) {
        entries.push(this.renderDate(date));
        lastDate = date;
      }
    }

    if (entries.length > 0) {
      return html`
      <ol class="cards">
        ${entries}
        <div class="card-sentinel"></div>
      </ol>
      `;
    } else {
      return html`
      <div class="empty">
        <p>Nothing yet!</p>
      </div>
      `;
    }
  }
}

customElements.define("borg-cards-panel", CardsPanel);
