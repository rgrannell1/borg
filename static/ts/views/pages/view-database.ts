import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

export class ViewDatabasePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div>

    </div>
    `
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage as LitElement);
