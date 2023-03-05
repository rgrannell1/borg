import {
  html,
  LitElement,
} from "../../../../../vendor/lit-element.js";

import "./date.js";
import "./card.js";
import "./search-bar.js";
import "./cards-panel.js";
import { LitEvents } from "../../../../models/lit-events.js";

export class CardInput extends LitElement {
  constructor() {
    super();
    this.database = {};
    this.state = "default";
  }

  static get properties() {
    return {
      database: { type: Object },
      state: { type: String },
      bookmarkCount: { type: Number },
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

    const dispatched = new CustomEvent(LitEvents.ADD_CARD, {
      detail: {
        alias: this.database.alias,
        url
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  buttonText() {
    if (this.state === 'default') {
      return 'Assimilate';
    } else if (this.state === 'ok') {
      return this.bookmarkCount
        ? `Assimilated ${this.bookmarkCount}`
        : `Assimilated`;
    } else if (this.state === 'error') {
      return 'Failed';
    } else if (this.state === 'unauthorized') {
      return 'Not Authorised';
    }
  }

  render() {
    const classes = ['submit-button'];

    if (this.state === 'ok') {
      classes.push('submit-ok');
    } else if (this.state === 'error') {
      classes.push('submit-error');
    } else if (this.state === 'unauthorized') {
      classes.push('submit-unauthorized');
    }

    return html`
    <input id="bookmark-url" type="url" class="borg-input" placeholder="URL" />
    <button
      id="submit-bookmark"
      class="${classes.join(' ')}"
      @submit=${this.broadcastAddCard}>${this.buttonText()}</button>
    `;
  }
}

customElements.define("borg-card-input", CardInput);
