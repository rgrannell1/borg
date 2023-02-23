import { html, LitElement } from "../../../vendor/lit-element.js";

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

customElements.define(
  "borg-navbar",
  BorgNavbar as any as CustomElementConstructor,
);
