
import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

export class AboutPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="frontpage-cnt">

        <p>Hello</p>

      </div>
    `;
  }
}

customElements.define("borg-about", AboutPage as LitElement);
