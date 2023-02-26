import { html, css, LitElement } from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import "./components/navbar.js";
import "./pages/frontpage.js";

export class BorgAddDatabase extends LitElement {
  createRenderRoot() {
    return this;
  }

  onClick() {
    (this as LitElement).dispatchEvent(new CustomEvent('borg-add-database'));
  }

  render() {
    return html`
    <div class="borg-database-add" @click=${ this.onClick }>
      <div>Add Database</div>
    </div>
    `
  }
}

export class BorgDatabase extends LitElement {
  name: string;
  static get properties() {
    return {
      name: { type: String }
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <li class="borg-database">
      <span>${ this.name }</span>
      <span class="database-settings">⌄</span>
    </li>
    `
  }
}

type Database = {
  name: string
}

export class BorgSidebar extends LitElement {
  createRenderRoot() {
    return this;
  }

  databases(): Database[] {
    return [
      { name: 'mycloud.rgrannell.xyz' },
      { name: 'mycloud.rgrannell.xyz' },
      { name: 'mycloud.rgrannell.xyz' },
      { name: 'mycloud.rgrannell.xyz' },
      { name: 'mycloud.rgrannell.xyz' },
      { name: 'mycloud.rgrannell.xyz' }
    ]
  }

  renderDatabases() {
    return html`
    <ul>${
      this.databases().map((db) => {
        return html`
        <borg-database name="${db.name}"></borg-database>
        `
      })
    }
    </ul>`
  }

  render() {
    return html`
    <aside class="borg-sidebar">
      <div>
        <borg-add-database/>
      </div>
      ${ this.renderDatabases() }
    </aside>
    `
  }
}

export class BorgApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  addDatabase() {
    (this as LitElement).addEventListener('borg-add-database', event => {
      console.log('ok');
    })
  }

  connectedCallback() {
    super.connectedCallback();
    this.addDatabase();
  }

  render() {
    return html`
    <div class="app-cnt">
      <borg-navbar></borg-navbar>

      <borg-sidebar></borg-sidebar>

      <main>
        <borg-frontpage></borg-frontpage>
      </main>
    </div>
    `;
  }
}

customElements.define("borg-add-database", BorgAddDatabase as LitElement);
customElements.define("borg-database", BorgDatabase as LitElement);
customElements.define("borg-sidebar", BorgSidebar as LitElement);
customElements.define("borg-app", BorgApp as LitElement);
