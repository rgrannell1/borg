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
      focusedCard: { type: Object },
      totalBookmarks: { type: Number },
      saveState: { type: String },
      database: { type: Object },
      query: { type: String },
      syncTime: { type: Date },
    };
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    for await (const event of ClientStorage.sync()) {
      this.dispatchEvent(event);
    }

    this.syncTime = new Date();
    this.requestUpdate();
  }

  resetButton() {
    setTimeout(() => {
      if (this.saveState !== "saving") {
        this.saveState = "default";
        this.requestUpdate();
      }
    }, 3_500);
  }

  async addCard(event) {
    this.saveState = "saving";
    const res = await ClientStorage.writeCard(this.database, event.detail.url);

    this.totalBookmarks = res.totalBookmarks;
    this.saveState = res.state;

    this.resetButton();

    for await (const event of ClientStorage.sync()) {
      this.dispatchEvent(event);
    }
    this.syncTime = new Date();
  }

  async deleteCard(event ) {
    await ClientStorage.deleteCard(this.database, event.detail.content);
    this.totalBookmarks -= 1;
    this.requestUpdate();
  }

  viewCard(event) {
    this.focusedCard = event.detail.content;
  }

  render() {
    return html`
    <borg-search-bar
      .query=${this.query}></borg-search-bar>

    <borg-cards-panel
      @view-card=${this.viewCard}
      @delete-card=${this.deleteCard}
      .syncTime=${this.syncTime}
      .query=${this.query}
      .database=${this.database}></borg-cards-panel>

    <borg-card-input
      @add-card=${this.addCard}
      .syncTime=${this.syncTime}
      .saveState=${this.saveState}
      .focusedCard=${this.focusedCard}
      .database=${this.database}></borg-card-input>
    `;
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage);
