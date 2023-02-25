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

  render() {
    let appPage;

    if (this.page === BorgPages.ADD_BOOKMARK) {
      appPage = html`<borg-add-bookmark/>`;
    } else if (this.page === BorgPages.SHOW_BOOKMARKS) {
      appPage = html`<borg-show-bookmarks/>`;
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

customElements.define("borg-app", BorgApp as LitElement);
