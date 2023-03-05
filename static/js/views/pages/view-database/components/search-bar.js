import {
  css,
  html,
  LitElement,
} from "../../../../../vendor/lit-element.js";

import { LitEvents } from '../../../../models/lit-events.js';

export class SearchBar extends LitElement {
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
      @keydown=${this.broadcastQuery}
      class="borg-input"
      placeholder="Search" />
    `;
  }
}

customElements.define("borg-search-bar", SearchBar);
