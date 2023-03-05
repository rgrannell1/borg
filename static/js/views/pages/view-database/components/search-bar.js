import {
  html,
  LitElement,
} from "../../../../../vendor/lit-element.js";

import { LitEvents } from '../../../../models/lit-events.js';

export class SearchBar extends LitElement {
  static get properties() {
    return {
      query: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastQuery(event) {
    const query = event.target.value;

    const dispatched = new CustomEvent(LitEvents.SEARCH, {
      detail: { query },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    return html`
    <input
      id="search-cards"
      class="borg-input"
      value=${this.query}
      @keyup=${this.broadcastQuery}
      placeholder="Search" />
    `;
  }
}

customElements.define("borg-search-bar", SearchBar);
