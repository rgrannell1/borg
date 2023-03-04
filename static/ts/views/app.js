import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { BorgCache } from "../services/cache";

import "./pages/about.js";
import "./components/navbar.js";
import "./components/database.js";
import "./pages/frontpage.js";
import "./pages/add-database.js";
import "./pages/view-database.js";

import { LitEvents } from "../models/lit-events.js";
import { Components } from "../models/components.js";

export class AddDatabase extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
    };
  }
  createRenderRoot() {
    return this;
  }

  onClick() {
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
    const active = this.active ? "active" : "";

    return html`
    <div class="borg-database-add ${active}" @click=${this.onClick}>
      <div>Databases</div>
    </div>
    `;
  }
}

export class App extends LitElement {
  constructor() {
    super();
    this.page = Components.FRONTPAGE;
    this.databases = BorgCache.getDatabases();
  }

  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
    };
  }

  setForm(credentials) {
    const alias = document.querySelector("#alias");
    const url = document.querySelector("#url");
    const topic = document.querySelector("#topic");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    alias.value = credentials.alias;
    url.value = credentials.url;
    topic.value = credentials.topic;
    username.value = credentials.username;
    password.value = credentials.password;

    this.requestUpdate();
  }

  async handleAddDatabase(event) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    BorgCache.setDatabases(this.databases);

    await this.requestUpdate();
  }

  renderDatabases() {
    return html`
    <ul>
      ${
      Object.values(this.databases).map((db) => {
        return html`<borg-database alias=${db.alias}></borg-database>`;
      })
    }
    </ul>
    `;
  }

  navigate(event) {
    const detail = event.detail;

    if (detail.component === Components.ABOUT) {
      this.page = Components.ABOUT;
    } else if (detail.component === Components.ADD_DATABASE) {
      this.page = Components.ADD_DATABASE;

      // if none, treat as a new database form
      this.selectedDatabase = detail?.alias;
    } else if (detail.component === Components.VIEW_DATABASE) {
      this.page = Components.VIEW_DATABASE;
      this.selectedDatabase = detail.alias;
    }

    this.requestUpdate();
  }

  render() {
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === Components.ADD_DATABASE) {
      const db = { ...this.databases[this.selectedDatabase] };

      subpage =
        html`<borg-add-database-page .database=${db}></borg-add-database-page>`;
    } else if (this.page === Components.VIEW_DATABASE) {
      const db = this.databases[this.selectedDatabase];
      subpage =
        html`<borg-view-database-page .database=${db}></borg-view-database-page>`;
    } else if (this.page === Components.ABOUT) {
      subpage = html`<borg-about></borg-about>`;
    }

    const dbs = Object.values(this.databases);
    return html`
    <div class="app-cnt"
      @navigate=${this.navigate}
      @submit-add-database=${this.handleAddDatabase}>
      <borg-navbar .page=${this.page}></borg-navbar>

      <aside class="borg-sidebar">
        <div>
          <borg-add-database .active=${this.page === "add-database"}/>
        </div>
        ${this.renderDatabases()}
      </aside>

      <main>
        ${subpage}
      </main>
    </div>
    `;
  }
}

customElements.define("borg-add-database", AddDatabase);
customElements.define("borg-app", App);
