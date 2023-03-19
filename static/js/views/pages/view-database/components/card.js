import { css, html, LitElement } from "../../../../../vendor/lit-element.js";

import { DateTime } from "../../../../models/datetime.js";
import { AppEvents } from "../../../../models/app-events.js";

export class Card extends LitElement {
  static TEXT_CUTOFF = 85;

  static get properties() {
    return {
      content: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastViewCard(event) {
    const dispatched = new CustomEvent(AppEvents.VIEW_CARD, {
      detail: { content: this.content },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    const date = new Date(this.content.created_at);
    const title = date.toLocaleString();
    const url = this.content.url;

    const urlTitle = url.length > Card.TEXT_CUTOFF
      ? url.slice(0, Card.TEXT_CUTOFF) + "..."
      : url;

    return html`
    <section class="card" @click=${this.broadcastViewCard}>
      <p class="card-url">
        <a href=${url} target="_blank">${urlTitle}</a>
      </p>
      <p class="card-date" title=${title}>${DateTime.formatTime(date)}</p>
      <span class="delete-card" role="button">x</span>
    </section>
    `;
  }
}

customElements.define("borg-card", Card);
