import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";

export class AddDatabasePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  getForm(event: Event) {
    const alias = document.getElementById("alias") as any;
    const url = document.getElementById("url") as any;
    const topic = document.getElementById("topic") as any;
    const username = document.getElementById("username") as any;
    const password = document.getElementById("password") as any;

    return {
      alias: alias.value,
      url: url.value,
      topic: topic.value,
      username: username.value,
      password: password.value,
    };
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const data = this.getForm(event);
    const custom = new CustomEvent(LitEvents.SUBMIT_ADD_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    (this as LitElement).dispatchEvent(custom);
  }

  render() {
    return html`
    <form id="borg-add-machine-form">

      <div class="borg-input-cnt">
        <label for="alias">Alias</label>
        <br/>
        <input class="borg-input" type="text" id="alias" name="alias"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="url">URL</label>
        <br/>
        <input class="borg-input" type="url" id="url" name="url"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="topic">Topic</label>
        <br/>
        <input class="borg-input" type="text" id="topic" name="topic"/>
        <br/>
      </div>

      <br/>

      <div class="borg-input-cnt">
        <label for="username">Username</label>
        <br/>
        <input class="borg-input" type="text" id="username" name="username"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="password">Password</label>
        <br/>
        <input class="borg-input" type="text" id="password" name="password"/>
        <br/>
      </div>

      <br/>

      <input class="submit-button"
      @click=${
      this.handleSubmit.bind(this)
    } type="button" value="Add Database"/>

    </form>
    `;
  }
}

customElements.define("borg-add-database-page", AddDatabasePage as LitElement);
