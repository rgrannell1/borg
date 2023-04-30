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

  broadcastNotificationsToggle() {
    const event = new CustomEvent(AppEvents.TOGGLE_NOTIFICATIONS, {
      detail: {

      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  broadcastBurgerToggle() {
    const event = new CustomEvent(AppEvents.TOGGLE_BURGER_MENU, {
      detail: {

      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="navbar-button">
            <a
              @click=${this.broadcastBurgerToggle}
              href="#">☰</a>
          </li>

          <li class="navbar-button ${this.page === "about" ? "active" : ""}">
          <a
            @click=${this.broadcastAboutNavigation}
            href="#">About</a>

          <li class="navbar-button navbar-divider"> </li>

          <li
            @click=${this.broadcastNotificationsToggle}
            class="navbar-button navbar-bell-icon">
            <a href="#">🔔</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", Navbar);
