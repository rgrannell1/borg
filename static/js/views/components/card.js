import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { DateTime } from "../../models/datetime.js";

export class Card extends LitElement {
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

    return html`
    <section class="card">
      <p>
        <a href=${url}>${url}</a>
      </p>
      <br/>
      <p class="card-date" title=${title}>${DateTime.formatTime(date)}</p>
    </section>
    `;
  }
}

customElements.define("borg-card", Card);
