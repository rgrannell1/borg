import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { BorgCache } from "../services/cache";

import "./pages/about.js";
import "./components/navbar.js";
import "./pages/frontpage.js";
import "./pages/add-database.js";
import "./pages/view-database.js";

import { LitEvents } from '../models/lit-events.js';

export class BorgAddDatabase extends LitElement {
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
        component: 'add-database'
      },
      bubbles: true,
      composed: true,
    });

    (this).dispatchEvent(event);
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

export class BorgDatabase extends LitElement {
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
        component: 'view-database',
        alias: this.alias
      },
      bubbles: true,
      composed: true,
    });

    (this).dispatchEvent(event);
  }

  changeSettings() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: 'add-database',
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    (this).dispatchEvent(event);
  }

  render() {
    return html`
    <li class="borg-database">
      <span
        @click=${ this.viewDatabase }
        class="database-name">${this.alias}</span>
      <span
        title="Settings"
        @click=${ this.changeSettings }
        class="database-settings">⚙</span>
    </li>
    `;
  }
}



export class BorgApp extends LitElement {
  constructor() {
    super();
    this.page = "frontpage";
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

    (this).requestUpdate();
  }

  async handleAddDatabase(event) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    BorgCache.setDatabases(this.databases);

    await (this).requestUpdate();
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

    if (detail.component === "about") {
      this.page = "about";
    } else if (detail.component === "add-database") {
      this.page = "add-database";

      // if none, treat as a new database form
      this.selectedDatabase = detail?.alias
    }

    (this).requestUpdate();
  }

  render() {
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === "add-database") {
      const db = {...this.databases[ this.selectedDatabase ]};

      subpage = html`<borg-add-database-page .database=${ db }></borg-add-database-page>`;
    } else if (this.page === "view-database") {
      const db = this.databases[ this.selectedDatabase ];
      subpage = html`<borg-view-database-page .database=${db}></borg-view-database-page>`;
    } else if (this.page === "about") {
      subpage = html`<borg-about></borg-about>`;
    }

    const dbs = Object.values(this.databases);
    return html`
    <div class="app-cnt"
      @navigate=${ this.navigate }
      @submit-add-database=${ this.handleAddDatabase }>
      <borg-navbar .page=${this.page}></borg-navbar>

      <aside class="borg-sidebar">
        <div>
          <borg-add-database .active=${ this.page === "add-database" }/>
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

customElements.define("borg-add-database", BorgAddDatabase);
customElements.define("borg-database", BorgDatabase);
customElements.define("borg-app", BorgApp);
