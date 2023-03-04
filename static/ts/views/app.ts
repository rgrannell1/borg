import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../models/lit-events.js";
import { BorgCache } from "../services/cache";

import "./pages/about.js";
import "./components/navbar.js";
import "./pages/frontpage.js";
import "./pages/add-database.js";
import "./pages/view-database.js";

type Database = {
  alias: string;
  url: string;
  topic: string;
  username: string;
  password: string;
};

export class BorgAddDatabase extends LitElement {
  active: Boolean;

  static get properties() {
    return {
      active: { type: Boolean },
    };
  }
  createRenderRoot() {
    return this;
  }

  onClick() {
    const event = new CustomEvent(LitEvents.NAVIGATE_ADD_DATABASE, {
      bubbles: true,
      composed: true,
    });

    (this as LitElement).dispatchEvent(event);
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
  alias: string;
  static get properties() {
    return {
      alias: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  viewNames() {
    const event = new CustomEvent(LitEvents.NAVIGATE_VIEW_DATABASE, {
      detail: {
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    (this as LitElement).dispatchEvent(event);
  }

  changeSettings() {
    const event = new CustomEvent(LitEvents.NAVIGATE_ADD_DATABASE, {
      detail: {
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    (this as LitElement).dispatchEvent(event);
  }

  render() {
    return html`
    <li class="borg-database">
      <span
        @click=${ this.viewNames }
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
  page: string;
  selectedDatabase?: string;
  databases: Record<string, Database>;

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
      databases: { type: Object },
    };
  }

  setForm(credentials: Database) {
    const alias = document.querySelector("#alias") as HTMLInputElement;
    const url = document.querySelector("#url") as HTMLInputElement;
    const topic = document.querySelector("#topic") as HTMLInputElement;
    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;

    alias.value = credentials.alias;
    url.value = credentials.url;
    topic.value = credentials.topic;
    username.value = credentials.username;
    password.value = credentials.password;

    (this as LitElement).requestUpdate();
  }

  async navigateAddDatabase(event: CustomEvent) {
    this.page = "add-database";

    if (event?.detail?.alias) {
      const credentials = this.databases[event.detail.alias];

      this.setForm(credentials)
    }

    await (this as LitElement).requestUpdate();
  }

  async navigateViewDatabase(event: CustomEvent) {
    this.page = "view-database";
    this.selectedDatabase = event.detail.alias;

    await (this as LitElement).requestUpdate();
  }

  async handleAddDatabase(event: CustomEvent) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    BorgCache.setDatabases(this.databases);

    await (this as LitElement).requestUpdate();
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

  navigate(event: CustomEvent) {
    const detail = event.detail;

    if (detail.component === "about") {
      this.page = "about";
      (this as LitElement).requestUpdate();
    }
  }

  render() {
    console.log('app: render')
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === "add-database") {
      subpage = html`<borg-add-database-page></borg-add-database-page>`;
    } else if (this.page === "view-database") {
      subpage = html`<borg-view-database-page .database=${this.databases[ this.selectedDatabase ]}></borg-view-database-page>`;
    } else if (this.page === "about") {
      subpage = html`<borg-about></borg-about>`;
    }

    const dbs = Object.values(this.databases);
    return html`
    <div class="app-cnt"
      @navigate=${ this.navigate }
      @navigate-add-database=${ this.navigateAddDatabase }
      @navigate-view-database=${ this.navigateViewDatabase }
      @submit-add-database=${ this.handleAddDatabase }>
      <borg-navbar page=${this.page}></borg-navbar>

      <aside class="borg-sidebar">
        <div>
          <borg-add-database active=${ this.page === "add-database" }/>
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

customElements.define("borg-add-database", BorgAddDatabase as LitElement);
customElements.define("borg-database", BorgDatabase as LitElement);
customElements.define("borg-app", BorgApp as LitElement);
