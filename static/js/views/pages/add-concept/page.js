import { css, html, LitElement } from "../../../../vendor/lit-element.js";

export class AddConceptPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <h2>Add Concept</h2>


    `
  }
}

customElements.define("borg-add-concept-page", AddConceptPage);
