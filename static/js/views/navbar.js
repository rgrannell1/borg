import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import NAVBAR_STYLE from "../styles/navbar.js";
import SHARED_STYLE from "../styles/shared.js";

export class BorgNavbar extends LitElement {
  static get styles() {
    return [
      SHARED_STYLE,
      NAVBAR_STYLE,
    ];
  }
  render() {
    return html`
    <header>
      <nav class="navbar">
        <ul>
          <li>
            <span class="brand"><h1>Borg</h1></span>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", BorgNavbar);
