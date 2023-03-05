import { css, html, LitElement } from "../../../../../vendor/lit-element.js";

import { DateTime } from "../../../../models/datetime.js";

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

  render() {
    const date = new Date(this.content.created_at);
    const title = date.toLocaleString();
    const url = this.content.url;

    const urlTitle = url.length > Card.TEXT_CUTOFF
      ? url.slice(0, Card.TEXT_CUTOFF) + "..."
      : url;

    return html`
    <section class="card">
      <p>
        <a href=${url} target="_blank">${urlTitle}</a>
      </p>
      <br/>
      <p class="card-date" title=${title}>${DateTime.formatTime(date)}</p>
    </section>
    `;
  }
}

customElements.define("borg-card", Card);
