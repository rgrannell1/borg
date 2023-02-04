import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import SHARED_STYLE from "../styles/shared.js";
import ADD_BOOKMARK_STYLE from "../styles/add-bookmark-page.js";

import { CommonStorageAPI } from "../services/api.js";
import { AddBookmarkStates } from "../models/add-bookmark-states.js";
import * as events from "../models/events.js";


/*
 * AddBookmarkPage
 */
class AddBookmarkPage extends LitElement {
  static RESET_TIME = 3_500;
  static ENDPOINT = "https://mycloud.rgrannell.xyz";

  constructor() {
    super();
    this.state = AddBookmarkStates.DEFAULT;
  }

  static get styles() {
    return [
      SHARED_STYLE,
      ADD_BOOKMARK_STYLE,
    ];
  }

  static get properties() {
    return {
      state: { type: String },
      totalBookmarks: { type: Number },
    };
  }

  /*
   * Clear the URL input field when the clear button is clicked.
   *
   * @param {Event} event
   */
  clearUrl(event) {
    const $url = this.shadowRoot.getElementById("url");

    event.preventDefault();
    $url.value = "";
  }

  /*
   * Get the form information from the page.
   *
   * @param {Event} event
   * @returns {Object} credentials and url
   */
  getFormInformation(event) {
    const tgt = event.currentTarget;

    const $username = this.shadowRoot.getElementById("username");
    const $pass = this.shadowRoot.getElementById("pass");
    const $url = this.shadowRoot.getElementById("url");

    return {
      credentials: {
        username: $username.value,
        password: $pass.value,
      },
      url: $url.value,
    };
  }

  /*
   * Handle the form submission; submit the bookmark to the server.
   *
   * @param {Event} event
   */
  async handleSubmit(event) {
    event.preventDefault();

    const { credentials, url } = this.getFormInformation(event);

    const client = new CommonStorageAPI(AddBookmarkPage.ENDPOINT, credentials);
    const res = await client.postContent(
      CommonStorageAPI.TOPIC_BOOKMARKS,
      events.AddBookmark(url),
    );

    if (!res.state) {
      console.error("Borg: No state returned from API call");
      return;
    }

    this.state = res.state;

    if (res.total) {
      this.totalBookmarks = res.total;
    }

    if (this.state !== AddBookmarkStates.DEFAULT) {
      await new Promise((res) => setTimeout(res, AddBookmarkPage.RESET_TIME));
      this.state = AddBookmarkStates.DEFAULT;
    }
  }

  renderUsernameInput() {
    return html`
    <div class="borg-input-cnt">
      <label for="username">Username</label>
      <br>
      <input class="borg-input" type="text" id="username" name="username" autocomplete="username">
    </div>
    `;
  }

  renderPasswordInput() {
    return html`
    <div class="borg-input-cnt">
      <label for="pass">Password</label>
      <br>
      <input class="borg-input" type="password" id="pass" name="password" required autocomplete="current-password">
    </div>
    `;
  }

  renderUrlInput() {
    return html`
    <label for="url">URL</label>
    <br>
    <div class="borg-url-input-cnt">
      <input class="borg-input" type="url" name="url" id="url" required autocomplete="off">
      <button @click=${this.clearUrl} id="borg-url-clear">X</button>
    </div>
    `;
  }

  render() {
    return html`
    <form id="borg-form" method="post">
      ${this.renderUsernameInput()}
      ${this.renderPasswordInput()}
      ${this.renderUrlInput()}

      <br>

      <borg-add-bookmark-button @click=${this.handleSubmit} state=${this.state} totalBookmarks=${this.totalBookmarks}>
      </borg-add-bookmark-button>
    </form>
    `;
  }
}

export class AddBookmarkButton extends LitElement {
  static get styles() {
    return [
      SHARED_STYLE,
      ADD_BOOKMARK_STYLE,
    ];
  }

  static get properties() {
    return {
      state: { type: String },
      totalBookmarks: { type: Number },
    };
  }

  /*
   * Render button-text depending on page-state
   *
   * @returns {string} button text
   */
  buttonText() {
    if (this.state === AddBookmarkStates.DEFAULT) {
      return "Assimilate";
    } else if (this.state === AddBookmarkStates.OK) {
      return this.totalBookmarks
        ? `Assimilated #${this.totalBookmarks.toLocaleString()}`
        : "Assimilated";
    } else if (this.state === AddBookmarkStates.UNAUTHORIZED) {
      return "Not Authorised";
    } else if (this.state === AddBookmarkStates.ERROR) {
      return "Failed";
    } else {
      console.error(`unknown state: ${this.state}`);
    }
  }

  render() {
    let classes = ["button-58"];

    if (this.state === AddBookmarkStates.DEFAULT) {
    } else if (this.state === AddBookmarkStates.OK) {
      classes.push("button-ok");
    } else if (this.state === AddBookmarkStates.ERROR) {
      classes.push("button-error");
    } else if (this.state === AddBookmarkStates.UNAUTHORIZED) {
      classes.push("button-unauthorized");
    }

    return html`
    <div>
      <button @click=${this.handleSubmit} class=${
      classes.join(" ")
    } id="borg-submit" class="button-58" id="borg-submit" type="submit">${this.buttonText()}</button>
    </div>
    `;
  }
}

customElements.define("borg-add-bookmark", AddBookmarkPage);
customElements.define("borg-add-bookmark-button", AddBookmarkButton);
