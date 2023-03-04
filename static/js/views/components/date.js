import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { DateTime } from '../../models/datetime.js';

export class DateSummary extends LitElement {
  static get properties() {
    return {
      date: { type: String }
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const title = new Date(this.date).toLocaleString();
    return html`
    <section class="date-summary" title=${title}>
      <p>${ DateTime.formatDate(new Date(this.date)) }</p>
    </section>
    `
  }
}

customElements.define("date-summary", DateSummary);
