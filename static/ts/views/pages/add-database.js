import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

export class AddDatabasePage extends LitElement {
  static get properties() {
    return {
      database: {
        type: Object
      }
    }
  }
  createRenderRoot() {
    return this;
  }

  getForm(event) {
    const alias = document.getElementById("alias");
    const url = document.getElementById("url");
    const topic = document.getElementById("topic");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    return {
      alias: alias.value,
      url: url.value,
      topic: topic.value,
      username: username.value,
      password: password.value,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = this.getForm(event);
    const custom = new CustomEvent(LitEvents.SUBMIT_ADD_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    (this).dispatchEvent(custom);
  }

  render() {
    const db = this.database;

    return html`
    <form id="borg-add-machine-form">

      <div class="borg-input-cnt">
        <label for="alias">Alias</label>
        <br/>
        <input class="borg-input" type="text" id="alias" name="alias" value="${ db?.alias ?? '' }"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="url">URL</label>
        <br/>
        <input class="borg-input" type="url" id="url" name="url" value="${ db?.url ?? '' }"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="topic">Topic</label>
        <br/>
        <input class="borg-input" type="text" id="topic" name="topic" value="${ db?.topic ?? '' }"/>
        <br/>
      </div>

      <br/>

      <div class="borg-input-cnt">
        <label for="username">Username</label>
        <br/>
        <input class="borg-input" type="text" id="username" name="username" value="${ db?.username ?? '' }"/>
        <br/>
      </div>

      <div class="borg-input-cnt">
        <label for="password">Password</label>
        <br/>
        <input class="borg-input" type="password" id="password" name="password" value="${ db?.password ?? '' }"/>
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

customElements.define("borg-add-database-page", AddDatabasePage);
