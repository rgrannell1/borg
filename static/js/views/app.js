import { html, LitElement } from "../../vendor/lit-element.js";

import "./components/navbar.js";
import "./components/database.js";
import "./components/sidebar.js";

import "./pages/about/page.js";
import "./pages/frontpage/page.js";
import "./pages/add-database/page.js";
import "./pages/add-concept/page.js";
import "./pages/view-database/page.js";

import { ClientStorage } from "../services/client-storage.js";
import { Components } from "../models/components.js";

export class App extends LitElement {
  constructor() {
    super();
    this.page = Components.FRONTPAGE;
    this.databases = {};
    this.syncState = {};
    this.logs = {};
    this.showSidebar = true;
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
      syncState: { type: Object },
      concepts: { type: Object },
      showSidebar: { type: Boolean },
    };
  }

  async handleDeleteDatabase(event) {
    const alias = event.detail.alias;

    await ClientStorage.clearCards({
      alias
    });

    delete this.databases[alias];
    this.databases = { ...this.databases };

    await ClientStorage.setDatabases(this.databases);

    delete this.selectedDatabase;
    await this.requestUpdate();
  }

  async handleAddTopic(event) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    const res = await ClientStorage.writeTopic(event.detail, event.detail.topic);
    console.log("add-topic-res", res);

    await ClientStorage.setDatabases(this.databases);
    this.selectedDatabase = event.detail.alias;
  }

  async handleAddConcept(event) {
    this.concepts = {
      ...this.concepts,
      [event.detail.alias]: event.detail,
    };

    await ClientStorage.setConcepts(this.concepts);
  }

  async handleDatabaseSyncing(event) {
    this.syncState[event.detail.alias] = 'syncing';
    this.syncState = { ...this.syncState };

    // todo create a class
    if (!this.logs[event.detail.alias]) {
      this.logs[event.detail.alias] = [];
    }

    this.logs[event.detail.alias].push({
      message: `Syncing from max-id ${event.detail.maxId}`,
      time: event.detail.time
    });
    this.requestUpdate();
  }

  async handleDatabaseSynced(event) {
    this.syncState[event.detail.alias] = 'synced';

    // todo create a flashy animation
    this.syncState = { ...this.syncState };

    this.logs[event.detail.alias].push({
      message: `Synced`,
      time: event.detail.time
    });
    this.requestUpdate();
  }

  async handleToggleBurgerMenu(event) {
    this.showSidebar = !this.showSidebar;
    console.log("showSidebar", this.showSidebar);
  }

  async handleSearch(event) {
    this.query = event.detail.query;
  }

  navigate(event) {
    const detail = event.detail;
    if (detail.component === Components.ABOUT_PAGE) {
      delete this.selectedDatabase;

      this.page = Components.ABOUT_PAGE;
    } else if (detail.component === Components.ADD_DATABASE) {
      this.page = Components.ADD_DATABASE;

      // if none, treat as a new database form
      this.selectedDatabase = detail?.alias;
    } else if (detail.component === Components.VIEW_DATABASE) {
      this.page = Components.VIEW_DATABASE;
      this.selectedDatabase = detail.alias;
    } else if (detail.component === Components.ADD_CONCEPT) {
      delete this.selectedDatabase;
      this.page = Components.ADD_CONCEPT;
    }

    this.requestUpdate();
  }

  renderAddDatabasePage() {
    const db = this.databases[this.selectedDatabase];

    return html`<borg-add-database-page
      .logs=${this.logs[this.selectedDatabase] ?? []}
      .lastUpdateTime="PLACEHOLDER"
      .database=${db}>
    </borg-add-database-page>`;
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
    } else if (this.page === Components.ABOUT_PAGE) {
      subpage = this.renderAboutPage();
    } else if (this.page === Components.ADD_CONCEPT) {
      subpage = html`<borg-add-concept-page></borg-add-concept-page>`;
    } else if (this.page === Components.VIEW_DELETED) {
      subpage = html`<borg-view-deleted-page></borg-view-deleted-page>`;
    }

    return subpage;
  }

  render() {
    console.log("app: render");

    const classList = ["app-cnt"];
    if (this.showSidebar) {
      classList.push("show-sidebar");
    }

    return html`
    <div class="${ classList.join(' ') }"
      @navigate=${this.navigate}
      @search=${this.handleSearch}
      @delete-database=${this.handleDeleteDatabase}
      @database-syncing=${this.handleDatabaseSyncing}
      @database-synced=${this.handleDatabaseSynced}
      @toggle-burger-menu=${this.handleToggleBurgerMenu}
      @add-concept=${this.handleAddConcept}
      @add-database=${this.handleAddTopic}>

      <borg-navbar
        .page=${this.page}>
      </borg-navbar>

      <borg-sidebar
        .page=${this.page}
        .syncState=${this.syncState}
        .selectedDatabase=${this.selectedDatabase}
        .databases=${this.databases}>
      </borg-sidebar>

      ${this.renderSubpage()}
    </div>
    `;
  }
}

customElements.define("borg-app", App);
