import {
  css,
  html,
  LitElement,
} from "../../../../vendor/lit-element.js";

import { LitEvents } from "../../../models/lit-events.js";

export class AddDatabasePage extends LitElement {
  static get properties() {
    return {
      database: {
        type: Object,
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
    const custom = new CustomEvent(LitEvents.SUBMIT_ADD_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    this.dispatchEvent(custom);
  }

  renderAlias(db) {
    return html`
    <div class="borg-input-cnt">
      <label for="alias">Alias</label>
      <br/>
      <input class="borg-input borg-input-narrow" type="text" id="alias" name="alias" value="${
      db?.alias ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderUrl(db) {
    return html`
    <div class="borg-input-cnt">
      <label for="url">URL</label>
      <br/>
      <input class="borg-input borg-input-narrow" type="url" id="url" name="url" value="${
      db?.url ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderTopic(db) {
    return html`
    <div class="borg-input-cnt">
      <label for="topic">Topic</label>
      <br/>
      <input class="borg-input borg-input-narrow" type="text" id="topic" name="topic" value="${
      db?.topic ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderUsername(db) {
    return html`
    <div class="borg-input-cnt">
      <label for="username">Username</label>
      <br/>
      <input class="borg-input borg-input-narrow" type="text" id="username" name="username" value="${
      db?.username ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderPassword(db) {
    return html`
    <div class="borg-input-cnt">
      <label for="password">Password</label>
      <br/>
      <input class="borg-input borg-input-narrow" type="password" id="password" name="password" value="${
      db?.password ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderSubmitButton(db) {
    return html`
      <input class="submit-button"
      @click=${this.onSubmit.bind(this)} type="button" value="Add Database"/>
      `;
  }

  render() {
    const db = this.database;

    return html`
    <form id="borg-add-machine-form">
      ${this.renderAlias(db)}
      ${this.renderUrl(db)}
      ${this.renderTopic(db)}

      <br/>

      ${this.renderUsername(db)}
      ${this.renderPassword(db)}

      <br/>

      ${this.renderSubmitButton(db)}
    </form>
    `;
  }
}

customElements.define("borg-add-database-page", AddDatabasePage);
