import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";
import { Components } from "../../models/components.js";

export class Database extends LitElement {
  static get properties() {
    return {
      alias: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  viewDatabase() {
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

  changeSettings() {
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
    return html`
    <li class="borg-database">
      <span
        @click=${this.viewDatabase}
        class="database-name">${this.alias}</span>
      <span
        title="Settings"
        @click=${this.changeSettings}
        class="database-settings">⚙</span>
    </li>
    `;
  }
}

customElements.define("borg-database", Database);
