import { css, html, LitElement } from "../../../../vendor/lit-element.js";

import { AppEvents } from "../../../models/app-events.js";

import './components/log-panel.js';

export class ViewDeletedCards extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div>

    </div>
    `
  }
}

export class AddDatabasePage extends LitElement {
  static get properties() {
    return {
      database: {
        type: Object,
      },
      logs: {
        type: Array,
      },
      lastUpdateTime: {
        type: Date,
      },
    };
  }
  createRenderRoot() {
    return this;
  }

  getForm() {
    const alias = document.querySelector("#alias");
    const url = document.querySelector("#url");
    const topic = document.querySelector("#topic");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    return {
      alias: alias.value,
      url: url.value,
      topic: topic.value,
      username: username.value,
      password: password.value,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const data = this.getForm(event);

    if (!data.alias) {
      return;
    }

    const custom = new CustomEvent(AppEvents.ADD_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    this.dispatchEvent(custom);
  }

  onDelete(event) {
    event.preventDefault();

    const data = this.getForm(event);

    const custom = new CustomEvent(AppEvents.DELETE_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    this.dispatchEvent(custom);
  }

  renderAlias(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="A memorable name for this common-storage topic" for="alias">Alias</label>
      <br/>
      <input spellcheck="false" ?readonly=${this.database} class="borg-input borg-input-narrow" type="text" id="alias" name="alias" value="${
      db?.alias ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderUrl(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="A common-storage server URL" for="url">URL</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="url" id="url" name="url" value="${
      db?.url ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderTopic(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="A common-storage topic"  for="topic">Topic</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="text" id="topic" name="topic" value="${
      db?.topic ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderAuthenticationScheme(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="An authentication-scheme" for="authentication-scheme">Scheme</label>
      <br/>

      <select class="borg-selector" name="authentication-scheme">
        <option value="Basic Authentication">Basic Authentication</option>
      </select>
    </div>
    `
  }

  renderUsername(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="A username with read-write permission to this topic" for="username">Username</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="text" id="username" name="username" value="${
      db?.username ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderPassword(db) {
    return html`
    <div class="borg-input-cnt">
      <label title="A password with read-write permission to this topic" for="password">Password</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="password" id="password" name="password" value="${
      db?.password ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderSubmitButton() {
    const text = this.database ? "Update Topic" : "Add Topic";

    return html`
      <button
        class="submit-button"
        @click=${this.onSubmit}
        type="submit">${text}</button>
      `;
  }

  renderDeleteButton() {
    return html`
      <button
        class="submit-button danger"
        class="delete-button"
        @click=${this.onDelete}
        type="submit">Remove Topic</button>
      `;
  }

  render() {
    const db = this.database;
    const text = this.database ? "Update Topic" : "Add Topic";

    const buttons = this.database
      ? html`
        ${this.renderSubmitButton()}
        <div class="button-divider"></div>
        ${this.renderDeleteButton()}`
      : html`${this.renderSubmitButton()}`;

      return html`
    <h2>${text}</h2>

    <h2>Deleted Cards</h2>

    <borg-view-deleted-cards>
    </borg-view-deleted-cards>

    <form id="borg-add-machine-form">
      <h3>Database Settings</h3>

      ${this.renderAlias(db)}
      ${this.renderUrl(db)}
      ${this.renderTopic(db)}

      <div class="divider"></div>

      <h3>Authentication</h3>

      ${this.renderAuthenticationScheme(db)}
      ${this.renderUsername(db)}
      ${this.renderPassword(db)}

      <br/>

      ${buttons}
    </form>
    `;
  }
}

customElements.define("borg-view-deleted-cards", ViewDeletedCards);
customElements.define("borg-add-database-page", AddDatabasePage);
