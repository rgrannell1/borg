import { html, LitElement } from "../../vendor/lit-element.js";

import "./components/navbar.js";
import "./pages/add-bookmark.js";
import "./pages/show-bookmark.js";

enum BorgPages {
  ADD_BOOKMARK = "add-bookmark",
  SHOW_BOOKMARKS = "show-bookmarks",
}

export class BorgApp extends LitElement {
  page: BorgPages;

  static get properties() {
    return {
      page: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  renderShowBookmarks() {
    return html`<borg-show-bookmarks/>`;
  }

  renderAddBookmark() {
    return html`<borg-add-bookmark/>`;
  }

  render() {
    let appPage;

    if (this.page === BorgPages.ADD_BOOKMARK) {
      appPage = this.renderAddBookmark();
    } else if (this.page === BorgPages.SHOW_BOOKMARKS) {
      appPage = this.renderShowBookmarks();
    } else {
      throw new Error("Unknown page");
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

customElements.define("borg-app", BorgApp as any);
