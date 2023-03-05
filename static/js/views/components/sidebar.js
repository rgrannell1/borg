
import { html, LitElement } from "../../../vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";
import { Components } from "../../models/components.js";

export class AddDatabase extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      selectedDatabase: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddDatabase() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_DATABASE,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const active = this.active && !this.selectedDatabase ? "active" : "";

    return html`
    <div class="borg-database-add ${active}" @click=${this.broadcastAddDatabase}>
      <div>Databases</div>
    </div>
    `;
  }
}

export class Sidebar extends LitElement {
  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  renderDatabases() {
    return html`
    <ul>
      ${
      Object.values(this.databases).map((db) => {
        const active = this.selectedDatabase === db.alias;

        return html`<borg-database .active=${active} .alias=${db.alias}></borg-database>`;
      })
    }
    </ul>
    `;
  }

  render() {
    return html`
    <aside class="borg-sidebar">
    <div>
      <borg-add-database .selectedDatabase=${this.selectedDatabase} .active=${
    this.page === "add-database"
}/>
    </div>
    ${this.renderDatabases()}
  </aside>
    `
  }
}

customElements.define("borg-add-database", AddDatabase);
customElements.define("borg-sidebar", Sidebar);
