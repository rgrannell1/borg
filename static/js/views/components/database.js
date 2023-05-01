import { css, html, LitElement } from "../../../vendor/lit-element.js";

import { AppEvents } from "../../models/app-events.js";
import { Components } from "../../models/components.js";

export class Database extends LitElement {
  static get properties() {
    return {
      alias: { type: String },
      syncing: { type: Boolean },
      active: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastViewDatabase() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
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
    const event = new CustomEvent(AppEvents.NAVIGATE, {
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
    const classList = ["borg-database"];

    if (this.active) {
      classList.push("active");
    }
    if (this.syncing) {
      classList.push("syncing");
    }

    return html`
    <li class="${classList.join(" ")}">
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
