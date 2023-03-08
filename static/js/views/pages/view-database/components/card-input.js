import { html, LitElement } from "../../../../../vendor/lit-element.js";

import "./date.js";
import "./card.js";
import "./search-bar.js";
import "./cards-panel.js";
import { AppEvents } from "../../../../models/app-events.js";

export class CardInput extends LitElement {
  constructor() {
    super();
    this.saveState = "default";
  }

  static get properties() {
    return {
      database: { type: Object },
      saveState: { type: String },
      bookmarkCount: { type: Number },
      focusedCard: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddCard(event) {
    event.preventDefault();

    const url = document.getElementById("bookmark-url").value;

    if (!url) {
      return;
    }

    const dispatched = new CustomEvent(AppEvents.ADD_CARD, {
      detail: {
        alias: this.database.alias,
        url,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  buttonText() {
    const state = this.saveState;

    if (state === "ok") {
      return this.bookmarkCount
        ? `Assimilated ${this.bookmarkCount}`
        : `Assimilated`;
    } else if (state === "error") {
      return "Failed";
    } else if (state === "unauthorized") {
      return "Not Authorised";
    } else if (state === "saving") {
      return "Assimilating...";
    } else {
      return "Assimilate";
    }
  }

  render() {
    const state = this.saveState;
    const classes = ["submit-button"];

    if (state === "ok") {
      classes.push("submit-ok");
    } else if (state === "saving") {
      classes.push("submit-saving");
    } else if (state === "error") {
      classes.push("submit-error");
    } else if (state === "unauthorized") {
      classes.push("submit-unauthorized");
    }

    // todo handle focused card

    return html`
    <input spellcheck="false" id="bookmark-url" type="url" class="borg-input" placeholder="URL" />
    <button
      id="submit-bookmark"
      class="${classes.join(" ")}"
      @click=${this.broadcastAddCard}>${this.buttonText()}</button>
    `;
  }
}

customElements.define("borg-card-input", CardInput);
