import { html, LitElement } from "../../../vendor/lit-element.js";

import { CommonStorageAPI } from "../../services/api.js";
import { AddBookmarkStates } from "../../models/add-bookmark-states.js";
import * as events from "../../models/events.js";

enum ButtonClasses {
  SUBMIT = "submit-button",
  OK = "button-ok",
  ERROR = "button-error",
  UNAUTHORIZED = "button-unauthorized",
}

/*
 * AddBookmarkPage
 */
class AddBookmarkPage extends LitElement {
  static RESET_TIME = 3_500;
  static ENDPOINT = "https://mycloud.rgrannell.xyz";

  state: AddBookmarkStates;
  totalBookmarks: number;

  constructor() {
    super();
    this.state = AddBookmarkStates.DEFAULT;
  }

  // Awaiting https://bugs.chromium.org/p/chromium/issues/detail?id=649162
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      state: {
        type: String,
        reflect: true,
      },
      totalBookmarks: {
        type: Number,
        reflect: true,
      },
    };
  }

  /*
   * Don't clear the URL input field when the user presses enter.
   */
  keyDown(event) {
    if (event.key === "Enter") {
      // don't clear on enter
      event.preventDefault();
    }
  }

  /*
   * Clear the URL input field when the clear button is clicked.
   *
   * @param {Event} event
   */
  clearUrl(event) {
    const $url = document.getElementById("url") as HTMLInputElement;

    event.preventDefault();
    $url.value = "";
  }

  /*
   * Get the form information from the page.
   *
   * @param {Event} event
   * @returns {Object} credentials and url
   */
  getFormInformation() {
    const $username = document.getElementById("username") as HTMLInputElement;
    const $pass = document.getElementById("pass") as HTMLInputElement;
    const $url = document.getElementById("url") as HTMLInputElement;

    return {
      credentials: {
        username: $username.value,
        password: $pass.value,
      },
      url: $url.value,
    };
  }

  async postBookmark() {
    const { credentials, url } = this.getFormInformation();

    const client = new CommonStorageAPI(AddBookmarkPage.ENDPOINT, credentials);
    return await client.postContent(
      CommonStorageAPI.TOPIC_BOOKMARKS,
      events.AddBookmark(url),
    );
  }

  refresh() {
    (this as LitElement).requestUpdate();
  }

  /*
   * Handle the form submission; submit the bookmark to the server.
   *
   * @param {Event} event
   */
  async handleSubmit(event: Event) {
    event.preventDefault();

    const res = await this.postBookmark();
    if (!res.state) {
      console.error("Borg: No state returned from API call");
      return;
    }
    this.state = res.state as AddBookmarkStates;
    this.refresh();

    if (res.total) {
      this.totalBookmarks = res.total;
    }
    this.refresh();

    // wait a moment before resetting
    if (this.state !== AddBookmarkStates.DEFAULT) {
      await new Promise((res) => setTimeout(res, AddBookmarkPage.RESET_TIME));
      this.state = AddBookmarkStates.DEFAULT;
    }
    this.refresh();
  }

  renderUsernameInput() {
    return html`
    <div class="borg-input-cnt">
      <label for="username">Username</label>
      <br>
      <input
        class="borg-input"
        type="text"
        id="username"
        name="username"
        autocomplete="username">
    </div>
    `;
  }

  renderPasswordInput() {
    return html`
    <div class="borg-input-cnt">
      <label for="pass">Password</label>
      <br>
      <input
        class="borg-input"
        type="password"
        id="pass"
        name="password"
        required
        autocomplete="current-password">
    </div>
    `;
  }

  renderUrlInput() {
    return html`
    <label for="url">URL</label>
    <br>
    <div class="borg-url-input-cnt">
      <input
        @keydown=${this.keyDown}
        class="borg-input"
        type="url" name="url" id="url" required autocomplete="off">

      <button
        @click=${this.clearUrl}
        id="borg-url-clear">X</button>
    </div>
    `;
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

  renderButton() {
    const classes = [ButtonClasses.SUBMIT];

    if (this.state === AddBookmarkStates.OK) {
      classes.push(ButtonClasses.OK);
    } else if (this.state === AddBookmarkStates.ERROR) {
      classes.push(ButtonClasses.ERROR);
    } else if (this.state === AddBookmarkStates.UNAUTHORIZED) {
      classes.push(ButtonClasses.UNAUTHORIZED);
    }

    return html`
    <div>
      <button
        class=${classes.join(" ")}
        id="borg-submit"
        type="submit">${this.buttonText()}</button>
    </div>
    `;
  }

  render() {
    return html`
    <form id="borg-form" method="post" @submit=${this.handleSubmit.bind(this)}>
      <main>
        ${this.renderUsernameInput()}
        ${this.renderPasswordInput()}
        ${this.renderUrlInput()}

        <br>

        ${this.renderButton()}
      </main>
    </form>
    `;
  }
}

customElements.define("borg-add-bookmark", AddBookmarkPage as LitElement);
