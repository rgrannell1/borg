import { html, LitElement } from "../../../vendor/lit-element.js";

import { BorgCache } from "../../services/cache.js";
import { CommonStorageAPI } from "../../services/api.js";

class SearchBookmarks extends LitElement {
  render() {
    return html`
    <div>
      <input type="text" placeholder="Search bookmarks" />
    </div>
    `;
  }
}

class BorgBookmarkCard extends LitElement {
  url: string;
  createdAt: Date;

  constructor() {
    super();
  }

  static get properties() {
    return {
      url: { type: String },
      createdAt: { type: Date },
    };
  }

  formatTime(date) {
    date = new Date(date);

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = date.getMinutes();

    return `${year}-${month}-${day}, ${hours}:${minutes}`;
  }

  render() {
    return html`
      <section class="borg-bookmark">
        <a href=${this.url}>${this.url}</a>
        <p>Saved at ${this.formatTime(this.createdAt)}</p>
      </section>
     `;
  }
}

class BorgCredentialsInput extends LitElement {
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

  render() {
    return html`
    ${this.renderUsernameInput()}
    ${this.renderPasswordInput()}
  `;
  }
}

/*
 * ShowBookmarksPage
 */
class ShowBookmarksPage extends LitElement {
  static ENDPOINT = "https://mycloud.rgrannell.xyz";

  bookmarks: Array<any>;
  credentials: any;

  constructor() {
    super();
    this.bookmarks = [];
    this.credentials = {};
  }

  static get properties() {
    return {
      bookmarks: { type: Array },
    };
  }

  async loadBookmarks() {
    const bookmarks = [];

    const client = new CommonStorageAPI(
      ShowBookmarksPage.ENDPOINT,
      this.credentials,
    );
    const cache = new BorgCache([
      "bookmarks",
    ], client);

    for await (const bookmark of cache.getContent("bookmarks")) {
      bookmarks.push(bookmark);
    }

    return bookmarks;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.bookmarks = await this.loadBookmarks();
  }

  renderCard(bookmark) {
    return html`
      <borg-bookmark-card url=${bookmark.url} createdAt=${bookmark.createdAt}></borg-bookmark-card>
    `;
  }

  render() {
    return html`
    <main>
      <borg-credentials-input></borg-credentials-input>
      </br>
      <borg-search-bookmarks></borg-search-bookmarks>

      <div>
        ${this.bookmarks.map((bookmark) => this.renderCard(bookmark))}
      </div>
    </main>
    `;
  }
}

customElements.define("borg-bookmark-card", BorgBookmarkCard as LitElement);
customElements.define("borg-credentials-input", BorgCredentialsInput as LitElement);
customElements.define("borg-search-bookmarks", SearchBookmarks as LitElement);
customElements.define("borg-show-bookmarks", ShowBookmarksPage as LitElement);
