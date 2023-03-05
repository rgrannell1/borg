import { html, LitElement } from "../../vendor/lit-element.js";

import "./components/navbar.js";
import "./components/database.js";
import "./components/sidebar.js";

import "./pages/about/page.js";
import "./pages/frontpage/page.js";
import "./pages/add-database/page.js";
import "./pages/view-database/page.js";

import { ClientStorage } from "../services/client-storage.js";
import { Components } from "../models/components.js";

export class App extends LitElement {
  constructor() {
    super();
    this.page = Components.FRONTPAGE;
    this.databases = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    this.databases = await ClientStorage.getDatabases();
    this.requestUpdate();
  }

  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
      query: { type: String }
    };
  }

  async handleAddDatabase(event) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    await ClientStorage.setDatabases(this.databases);
    await this.requestUpdate();
  }

  async handleSearch(event) {
    this.query = event.detail.query;
  }

  navigate(event) {
    const detail = event.detail;

    if (detail.component === Components.ABOUT_PAGE) {
      this.page = Components.ABOUT_PAGE;
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

  renderAddDatabasePage() {
    const db = { ...this.databases[this.selectedDatabase] };

    return html`<borg-add-database-page .database=${db}></borg-add-database-page>`;
  }

  renderViewDatabasePage() {
    const db = this.databases[this.selectedDatabase];

    return html`<borg-view-database-page .database=${db} .query=${this.query}></borg-view-database-page>`;
  }

  renderAboutPage() {
    return html`<borg-about></borg-about>`;
  }

  renderSubpage() {
    let subpage = html`<borg-frontpage></borg-frontpage>`;

    if (this.page === Components.ADD_DATABASE) {
      subpage = this.renderAddDatabasePage();
    } else if (this.page === Components.VIEW_DATABASE) {
      subpage = this.renderViewDatabasePage();
    } else if (this.page === Components.ABOUT) {
      subpage = this.renderAboutPage();
    }

    return subpage;
  }

  render() {
    console.log("app: render");

    return html`
    <div class="app-cnt"
      @navigate=${this.navigate}
      @search=${this.handleSearch}
      @submit-add-database=${this.handleAddDatabase}>

      <borg-navbar
        .page=${this.page}>
      </borg-navbar>

      <borg-sidebar
        .page=${this.page}
        .selectedDatabase=${this.selectedDatabase}
        .databases=${this.databases}>
      </borg-sidebar>

      ${this.renderSubpage()}
    </div>
    `;
  }
}

customElements.define("borg-app", App);
