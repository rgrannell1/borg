import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

export class Frontpage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="frontpage-cnt">

        <section class="borg-show-card-section">
        </section>

        <section class="borg-add-card-section">
        </section>

      </div>
    `;
  }
}

customElements.define("borg-frontpage", Frontpage);
