import {
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { LitEvents } from "../../models/lit-events.js";

export class BorgNavbar extends LitElement {
  page: string;

  static get properties() {
    return {
      page: {
        type: String,
      }
    };
  }

  createRenderRoot() {
    return this;
  }

  onAboutClick() {
    const event = new CustomEvent(LitEvents.NAVIGATE, {
      detail: {
        component: "about"
      },
      bubbles: true,
      composed: true,
    });

    (this as LitElement).dispatchEvent(event);
  }

  render() {
    const aboutActive = this.page === 'About'
      ? 'active'
      : '';

    return html`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="view-button ${ aboutActive }">
          <a
            @click=${ this.onAboutClick }
            href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", BorgNavbar as LitElement);
