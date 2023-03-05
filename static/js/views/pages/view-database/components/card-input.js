import {
  html,
  LitElement,
} from "../../../../../vendor/lit-element.js";

import "./date.js";
import "./card.js";
import "./search-bar.js";
import "./cards-panel.js";

export class CardInput extends LitElement {
  static get properties() {
    return {
      database: { type: Object }
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddCard() {

  }

  render() {
    return html`
    <input id="bookmark-url" type="url" class="borg-input" placeholder="URL" />
    <input
      id="submit-bookmark"
      class="submit-button"
      @submit=${this.broadcastAddCard}
      type="button"
      value="Assimilate"/>
    `;
  }
}

customElements.define("borg-card-input", CardInput);
