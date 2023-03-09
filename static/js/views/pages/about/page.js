import { css, html, LitElement } from "../../../../vendor/lit-element.js";

export class AboutPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="frontpage-cnt">
        <h2>About</h2>
      </div>
    `;
  }
}

customElements.define("borg-about", AboutPage);
