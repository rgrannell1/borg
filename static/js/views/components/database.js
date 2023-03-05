import { css, html, LitElement } from "../../../vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";
import { Components } from "../../models/components.js";

export class Database extends LitElement {
  static get properties() {
    return {
      alias: { type: String },
      active: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastViewDatabase() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: Components.VIEW_DATABASE,
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  broadcastChangeSettings() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_DATABASE,
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const active = this.active ? "active" : "";

    return html`
    <li class="borg-database ${active}">
      <span
        @click=${this.broadcastViewDatabase}
        class="database-name">${this.alias}</span>
      <span
        title="Settings"
        @click=${this.broadcastChangeSettings}
        class="database-settings">⚙</span>
    </li>
    `;
  }
}

customElements.define("borg-database", Database);
