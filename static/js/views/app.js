import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import "./add-bookmark-page.js";
import "./show-bookmarks-page.js";
import "./navbar.js";

class BorgPages {
  static ADD_BOOKMARK = "add-bookmark";
  static SHOW_BOOKMARKS = "show-bookmarks";
}

/*
 * BorgApp
 */
export class BorgApp extends LitElement {
  constructor() {
    super();
    this.page = BorgPages.ADD_BOOKMARK;
    //this.page = BorgPages.SHOW_BOOKMARKS;
  }
  static get properties() {
    return {
      page: { type: String },
    };
  }

  // Awaiting https://bugs.chromium.org/p/chromium/issues/detail?id=649162
  createRenderRoot() {
    return this;
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

    if (this.page === BorgPages.ADD_BOOKMARK) {
      appPage = this.renderAddBookmark();
    } else if (this.page === BorgPages.SHOW_BOOKMARKS) {
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
