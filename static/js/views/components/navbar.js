import {
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { AppEvents } from "../../models/app-events.js";
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

  broadcastAboutNavigation() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ABOUT_PAGE,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const aboutActive = this.page === "about" ? "active" : "";

    return html`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="view-button ${aboutActive}">
          <a
            @click=${this.broadcastAboutNavigation}
            href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", Navbar);
