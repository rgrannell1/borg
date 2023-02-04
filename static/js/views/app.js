import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import SHARED_STYLE from "../styles/shared.js";

import "./add-bookmark-page.js";
import "./show-bookmarks-page.js";
import "./navbar.js";

/*
 * BorgApp
 */
export class BorgApp extends LitElement {
  constructor() {
    super();
    this.page = "add-bookmark";
  }
  static get properties() {
    return {
      page: { type: String },
    };
  }
  static get styles() {
    return [
      SHARED_STYLE,
    ];
  }

  renderShowBookmarks() {
    return html`
    <borg-show-bookmarks>

    </borg-show-bookmarks>
    `;
  }

  renderAddBookmark() {
    return html`
    <borg-add-bookmark>

    </borg-add-bookmark>
    `;
  }

  render() {
    let appPage;

    if (this.page === "add-bookmark") {
      appPage = this.renderAddBookmark();
    } else if (this.page === "show-bookmarks") {
      appPage = this.renderShowBookmarks();
    }

    return html`
    <div>
      <borg-navbar></borg-navbar>
      <main>
        ${appPage}
      </main>
    </div>
    `;
  }
}

customElements.define("borg-app", BorgApp);
