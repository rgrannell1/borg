import {
  css,
  html,
  LitElement,
} from "../../../../../vendor/lit-element.js";

import { DateTime } from "../../../../models/datetime.js";

export class DateSummary extends LitElement {
  static get properties() {
    return {
      date: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const title = new Date(this.date).toLocaleDateString();
    return html`
    <section class="date-summary" title=${title}>
      <p>${DateTime.formatDate(new Date(this.date))}</p>
    </section>
    `;
  }
}

customElements.define("date-summary", DateSummary);
