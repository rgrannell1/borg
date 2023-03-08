import { html, LitElement } from "../../../vendor/lit-element.js";

import { AppEvents } from "../../models/app-events.js";
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
    const event = new CustomEvent(AppEvents.NAVIGATE, {
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
    <li class="borg-database-add">
      <span class="sidebar-heading">Databases</span>
      <span
        title="Add Database"
        @click=${this.broadcastAddDatabase}
        id="add-database"
        class="${active}">+</span>
    </li>
    `;
  }
}

export class Sidebar extends LitElement {
  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
      syncState: { type: Object },
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
        const syncing = this.syncState[db.alias] === 'syncing';

        return html`<borg-database .syncing=${syncing} .active=${active} .alias=${db.alias}></borg-database>`;
      })
    }
    </ul>
    `;
  }

  render() {
    return html`
    <aside class="borg-sidebar">
      <borg-add-database .active=${this.page === "add-database"} .selectedDatabase=${this.selectedDatabase}></borg-add-database>
      ${this.renderDatabases()}
      <br/>
    </aside>
    `;
  }
}

customElements.define("borg-add-database", AddDatabase);
customElements.define("borg-sidebar", Sidebar);
