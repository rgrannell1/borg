
import { html, LitElement } from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

export class BorgNavbar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="view-button view-button-active">
            <a href="#">Databases</a>
          </li>
          <li class="view-button">
          <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
    `
  }
}

customElements.define("borg-navbar", BorgNavbar as LitElement);
