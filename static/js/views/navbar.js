import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class BorgNavbar extends LitElement {
  createRenderRoot() {
    return this;
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
