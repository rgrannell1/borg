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
  name: string;
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
  name: string;
  static get properties() {
    return {
      name: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <li class="borg-database">
      <span>${this.name}</span>
      <span class="database-settings">⌄</span>
    </li>
    `;
  }
}

export class BorgSidebar extends LitElement {
  databases: Database[];

  static get properties() {
    return {
      databases: {
        type: Array,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  renderDatabases() {
    return html`
    <ul>${
      this.databases.map((db) => {
        return html`<borg-database name="${db.name}"></borg-database>`;
      })
    }
    </ul>
    `;
  }

  render() {
    return html`
    <aside class="borg-sidebar">
      <div>
        <borg-add-database/>
      </div>
      ${this.renderDatabases()}
    </aside>
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

  navigateAddDatabase() {
    (this as LitElement).addEventListener(
      LitEvents.NAVIGATE_ADD_DATABASE,
      async (event) => {
        this.page = "add-database";
        await (this as LitElement).requestUpdate();
      },
    );
  }

  addDatabase() {
    (this as LitElement).addEventListener(
      LitEvents.SUBMIT_ADD_DATABASE,
      async (event) => {
        this.databases = {
          ...this.databases,
          [event.detail.alias]: event.detail,
        };

        await (this as LitElement).render();
      },
    );
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.navigateAddDatabase();
    this.addDatabase();
  }

  render() {
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === "add-database") {
      subpage = html`<borg-add-database-page></borg-add-database-page>`;
    }

    const dbs = Object.values(this.databases);

    return html`
    <div class="app-cnt">
      <borg-navbar></borg-navbar>
      <borg-sidebar .databases=${dbs}></borg-sidebar>
      <main>
        ${subpage}
      </main>
    </div>
    `;
  }
}

customElements.define("borg-add-database", BorgAddDatabase as LitElement);
customElements.define("borg-database", BorgDatabase as LitElement);
customElements.define("borg-sidebar", BorgSidebar as LitElement);
customElements.define("borg-app", BorgApp as LitElement);
