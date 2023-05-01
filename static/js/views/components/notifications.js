import { html, LitElement } from "../../../vendor/lit-element.js";

export class Notification extends LitElement {
  static get properties() {
    return {
      status: { type: String },
      time: { type: Date },
      message: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  statusText() {
    if (this.status === "info") {
      return "Info";
    }

    if (this.status === "error") {
      return "Error";
    }

    return "";
  }

  render() {
    return html`
    <li class="notification">
      <div class="notification-status ${this.status}">
        ${this.statusText()}
      </div>
      <div class="notification-date">
        ${this.time}
      </div>
      <div class="notification-content">
        ${this.message}
      </div>
    </li>
    `;
  }
}

export class Notifications extends LitElement {
  static get properties() {
    return {
      notifications: { type: Array },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const notifications = this.notifications
      .slice(-5)
      .map((notification) => {
        return html`<borg-notification
          status=${notification.status}
          time=${notification.time}
          message=${notification.message}></borg-notification>`;
      });

    return html`
    <ul>
      ${notifications}
    </ul>
    `;
  }
}

customElements.define("borg-notification", Notification);
customElements.define("borg-notifications", Notifications);
