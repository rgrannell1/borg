import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import SHARED_STYLE from "../styles/shared.js";

class SearchBookmarks extends LitElement {
  render() {
    return html`
    <div>
      <input type="text" placeholder="Search bookmarks" />
    </div>
    `
  }
}

/*
 * ShowBookmarksPage
 */
class ShowBookmarksPage extends LitElement {
  static get styles() {
    return SHARED_STYLE;
  }
  render() {
    return html`
    <main>

    </main>
    `;
  }
}

customElements.define("borg-search-bookmarks", SearchBookmarks);
customElements.define("borg-show-bookmarks", ShowBookmarksPage);
