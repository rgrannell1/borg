import { css, html, LitElement } from "../../../../../vendor/lit-element.js";

import { AppEvents } from "../../../../models/app-events.js";

export class Log extends LitElement {
  static get properties() {
    return {
      log: {
        type: Object,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const time = this.log.time.toISOString();

    return html`
    <div class="log-entry">
      <span class="log-time">[${time}]</span>
      <span class="log-message">${this.log.message}</span>
    </div>
    `;
  }
}

customElements.define("borg-log-entry", Log);
