import {
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { ClientStorage } from "../../../services/client-storage.js";

import "./components/date.js";
import "./components/card.js";
import "./components/search-bar.js";
import "./components/cards-panel.js";
import "./components/card-input.js";

export class ViewDatabasePage extends LitElement {
  static get properties() {
    return {
      database: { type: Object },
      query: { type: String },
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

  render() {
    return html`
    <borg-search-bar
      .query=${this.query}></borg-search-bar>

    <borg-cards-panel
      .query=${this.query}
      .database=${this.database}></borg-cards-panel>

    <borg-card-input
      .database=${this.database}></borg-card-input>
    `;
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage);
