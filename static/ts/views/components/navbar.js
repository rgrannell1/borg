import {
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";
import { Components } from "../../models/components.js";

export class Navbar extends LitElement {
  static get properties() {
    return {
      page: {
        type: String,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  onAboutClick() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: Components.ABOUT_PAGE,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const aboutActive = this.page === "About" ? "active" : "";

    return html`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="view-button ${aboutActive}">
          <a
            @click=${this.onAboutClick}
            href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", Navbar);
