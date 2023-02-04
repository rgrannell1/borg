import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import SHARED_STYLE from "../styles/shared.js";

/*
 * ShowBookmarksPage
 */
class ShowBookmarksPage extends LitElement {
  static get styles() {
    return SHARED_STYLE;
  }
  render() {
    return html`
    <div>

    </div>
    `;
  }
}

customElements.define("borg-show-bookmarks", ShowBookmarksPage);
