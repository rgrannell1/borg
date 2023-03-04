import {
  css,
  html,
  LitElement,
} from "/home/rg/Code/ws/axon/borg/static/vendor/lit-element.js";

import { BorgCache } from '../../services/cache.js';

export class ViewDatabasePage extends LitElement {

  static get properties() {
    return {
      database: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    const cache = new BorgCache()

    await cache.init();
    //await cache.sync();
  }


  render() {
    return html`
    <div>
      <section class="cards">

      </section>

      <section class="input-card">

      </section>
    </div>
    `
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage);
