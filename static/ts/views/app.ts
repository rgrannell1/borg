import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../models/lit-events.js";

import "./components/navbar.js";
import "./pages/frontpage.js";
import "./pages/add-database.js";

type Database = {
  alias: string;
  url: string;
  topic: string;
  username: string;
  password: string;
};



export class BorgAddDatabase extends LitElement {
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
    return html`
    <div class="borg-database-add" @click=${this.onClick}>
      <div>Add Database</div>
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
        @click=${ this.changeSettings }
        class="database-settings">⚙</span>
    </li>
    `;
  }
}



export class BorgApp extends LitElement {
  page: string;
  databases: Record<string, Database>;

  constructor() {
    super();
    this.page = "frontpage";
    this.databases = {};
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
    await (this as LitElement).requestUpdate();
  }

  async handleAddDatabase(event: CustomEvent) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

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

  render() {
    console.log('app: render')
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === "add-database") {
      subpage = html`<borg-add-database-page></borg-add-database-page>`;
    } else if (this.page === "view-database") {
      subpage = html`<borg-view-database-page></borg-view-database-page>`;
    }

    const dbs = Object.values(this.databases);
    return html`
    <div class="app-cnt"
      @navigate-add-database=${ this.navigateAddDatabase }
      @navigate-view-database=${ this.navigateViewDatabase }
      @submit-add-database=${ this.handleAddDatabase }>
      <borg-navbar></borg-navbar>

      <aside class="borg-sidebar">
        <div>
          <borg-add-database/>
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
