import { html, LitElement } from "../../../vendor/lit-element.js";

import { AppEvents } from "../../models/app-events.js";
import { Components } from "../../models/components.js";



export class Notification extends LitElement {
  static get properties() {
    return {
      status: { type: String },
      date: { type: Date },
      content: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  statusText() {
    if (this.status === 'info') {
      return 'Info';
    }

    return '';
  }

  render() {
    return html`
    <li class="notification">
      <div class="notification-status ${this.status}">
        ${this.statusText()}
      </div>
      <div class="notification-date">
        ${this.date}
      </div>
      <div class="notification-content">
        ${this.content}
      </div>
    </li>
    `;
  }
}

export class Notifications extends LitElement {
  constructor() {
    super();
    this.notifications = [
      {
        status: 'info',
        date: '2020-01-01',
        content: 'This is a notification'
      },
      {
        status: 'info',
        date: '2020-01-01',
        content: 'This is a notification'
      }
    ];
  }

  static get properties() {
    return {
      notifications: { type: Array },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const notifications = this.notifications.map(notification => {
      return html`<borg-notification
        status=${notification.status}
        date=${notification.date}
        content=${notification.content}></borg-notification>`
    })

    return html`
    <ul>
      ${notifications}
    </ul>
    `;
  }
}

customElements.define("borg-notification", Notification);
customElements.define("borg-notifications", Notifications);
