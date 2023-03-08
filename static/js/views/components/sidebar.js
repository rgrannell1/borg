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
    const classList = ['sidebar-heading-button'];

    if (this.active && !this.selectedDatabase) {
      classList.push("active");
    }

    return html`
    <li class="borg-sidebar-heading">
      <span class="sidebar-heading">Topics</span>
      <span
        title="Add Topic"
        @click=${this.broadcastAddDatabase}
        id="add-topic"
        class="${classList.join(' ')}">+</span>
    </li>
    `;
  }
}

export class AddConcept extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddConcept() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_CONCEPT,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const classList = ['sidebar-heading-button'];

    if (this.active && !this.selectedDatabase) {
      classList.push("active");
    }

    return html`
    <li class="borg-sidebar-heading">
      <span class="sidebar-heading">Concepts</span>
      <span
        title="Add Concept"
        @click=${this.broadcastAddConcept}
        id="add-concept"
        class="${classList.join(' ')}">+</span>
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
      <borg-add-concept .active=${this.page === "add-concept"}></borg-add-concept>
    </aside>
    `;
  }
}

customElements.define("borg-add-database", AddDatabase);
customElements.define("borg-add-concept", AddConcept);
customElements.define("borg-sidebar", Sidebar);
