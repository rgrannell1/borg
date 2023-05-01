import { css, html, LitElement } from "../../../../../vendor/lit-element.js";

import "./log.js";

export class LogPanel extends LitElement {
  static get properties() {
    return {
      lastUpdateTime: {
        type: Date,
      },
      logs: {
        type: Array,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  renderLastUpdateTime() {
    let lastUpdateTime;

    for (const log of this.logs) {
      if (
        !lastUpdateTime ||
        (log.time > lastUpdateTime && log.message.includes("Synced"))
      ) {
        lastUpdateTime = log.time;
      }
    }

    if (!lastUpdateTime) {
      return html`
      <p class="last-update-time">
        Not updated yet
      </p>
      `;
    }

    return html`
    <p class="last-update-time">
      Updated ${lastUpdateTime.toISOString()}
    </p>
    `;
  }

  render() {
    return html`
    <details class="log-panel-cnt">
      <summary>
        <h3>Sync</h3>

        ${this.renderLastUpdateTime()}
      </summary>

      <pre class="log-panel">
        <code>
        ${
      this.logs.map((log) => {
        return html`<borg-log-entry .log=${log}></borg-log-entry>`;
      })
    }
        </code>
      </pre>
    </details>
    `;
  }
}

customElements.define("borg-log-panel", LogPanel);
