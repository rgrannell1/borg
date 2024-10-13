/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),e=new WeakMap;class o{constructor(t,s,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=s;}get styleSheet(){let t=this.i;const i=this.t;if(s&&void 0===t){const s=void 0!==i&&1===i.length;s&&(t=e.get(i)),void 0===t&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),s&&e.set(i,t));}return t}toString(){return this.cssText}}const h=t=>new o("string"==typeof t?t:t+"",void 0,i),n=(i,e)=>{if(s)i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const s of e){const e=document.createElement("style"),o=t.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,i.appendChild(e);}},c=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return h(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:l,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:f,getPrototypeOf:p}=Object,v=globalThis,m=v.trustedTypes,y=m?m.emptyScript:"",g=v.reactiveElementPolyfillSupport,_=(t,s)=>t,b={toAttribute(t,s){switch(s){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},S=(t,s)=>!a(t,s),w={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:S};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,s=w){if(s.state&&(s.attribute=!1),this.o(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),e=this.getPropertyDescriptor(t,i,s);void 0!==e&&l(this.prototype,t,e);}}static getPropertyDescriptor(t,s,i){const{get:e,set:o}=u(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const h=e?.call(this);o.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static o(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(_("properties"))){const t=this.properties,s=[...d(t),...f(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this.u=new Map;for(const[t,s]of this.elementProperties){const i=this.p(t,s);void 0!==i&&this.u.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(t){const s=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)s.unshift(c(t));}else void 0!==t&&s.push(c(t));return s}static p(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this.g();}g(){this._=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this.S(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this.$??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this.$?.delete(t);}S(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.$?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this.$?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}P(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor.p(t,i);if(void 0!==e&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(s,i.type);this.m=t,null==o?this.removeAttribute(e):this.setAttribute(e,o),this.m=null;}}_$AK(t,s){const i=this.constructor,e=i.u.get(t);if(void 0!==e&&this.m!==e){const t=i.getPropertyOptions(e),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this.m=e,this[e]=o.fromAttribute(s,t.type),this.m=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??S)(this[t],s))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._=this.T());}C(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this.m!==t&&(this.A??=new Set).add(t);}async T(){this.isUpdatePending=!0;try{await this._;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(const[t,s]of this.v)this[t]=s;this.v=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.C(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this.$?.forEach((t=>t.hostUpdate?.())),this.update(s)):this.M();}catch(s){throw t=!1,this.M(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this.$?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}M(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._}shouldUpdate(t){return !0}update(t){this.A&&=this.A.forEach((t=>this.P(t,this[t]))),this.M();}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,g?.({ReactiveElement:$}),(v.reactiveElementVersions??=[]).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P=globalThis,C=P.trustedTypes,T=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,M="?"+A,k=`<${M}>`,E=document,U=()=>E.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,R=t=>O(t)||"function"==typeof t?.[Symbol.iterator],z="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,I=/>/g,j=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(s,...i)=>({_$litType$:t,strings:s,values:i}),q=W(1),Z=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),G=new WeakMap,K=E.createTreeWalker(E,129);function Q(t,s){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(s):s}const X=(t,s)=>{const i=t.length-1,e=[];let o,h=2===s?"<svg>":"",r=V;for(let s=0;s<i;s++){const i=t[s];let n,c,a=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===V?"!--"===c[1]?r=L:void 0!==c[1]?r=I:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=o??V,a=-1):void 0===c[1]?a=-2:(a=r.lastIndex-c[2].length,n=c[1],r=void 0===c[3]?j:'"'===c[3]?H:D):r===H||r===D?r=j:r===L||r===I?r=V:(r=j,o=void 0);const u=r===j&&t[s+1].startsWith("/>")?" ":"";h+=r===V?i+k:a>=0?(e.push(n),i.slice(0,a)+x+i.slice(a)+A+u):i+A+(-2===a?s:u);}return [Q(t,h+(t[i]||"<?>")+(2===s?"</svg>":"")),e]};class Y{constructor({strings:t,_$litType$:s},i){let e;this.parts=[];let o=0,h=0;const r=t.length-1,n=this.parts,[c,a]=X(t,s);if(this.el=Y.createElement(c,i),K.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(e=K.nextNode())&&n.length<r;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(x)){const s=a[h++],i=e.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(s);n.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ot:"?"===r[1]?ht:"@"===r[1]?rt:et}),e.removeAttribute(t);}else t.startsWith(A)&&(n.push({type:6,index:o}),e.removeAttribute(t));if(B.test(e.tagName)){const t=e.textContent.split(A),s=t.length-1;if(s>0){e.textContent=C?C.emptyScript:"";for(let i=0;i<s;i++)e.append(t[i],U()),K.nextNode(),n.push({type:2,index:++o});e.append(t[s],U());}}}else if(8===e.nodeType)if(e.data===M)n.push({type:2,index:o});else {let t=-1;for(;-1!==(t=e.data.indexOf(A,t+1));)n.push({type:7,index:o}),t+=A.length-1;}o++;}}static createElement(t,s){const i=E.createElement("template");return i.innerHTML=t,i}}function tt(t,s,i=t,e){if(s===Z)return s;let o=void 0!==e?i.k?.[e]:i.U;const h=N(s)?void 0:s._$litDirective$;return o?.constructor!==h&&(o?._$AO?.(!1),void 0===h?o=void 0:(o=new h(t),o._$AT(t,i,e)),void 0!==e?(i.k??=[])[e]=o:i.U=o),void 0!==o&&(s=tt(t,o._$AS(t,s.values),o,e)),s}class st{constructor(t,s){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=s;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}N(t){const{el:{content:s},parts:i}=this._$AD,e=(t?.creationScope??E).importNode(s,!0);K.currentNode=e;let o=K.nextNode(),h=0,r=0,n=i[0];for(;void 0!==n;){if(h===n.index){let s;2===n.type?s=new it(o,o.nextSibling,this,t):1===n.type?s=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(s=new nt(o,this,t)),this._$AV.push(s),n=i[++r];}h!==n?.index&&(o=K.nextNode(),h++);}return K.currentNode=E,e}O(t){let s=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,s),s+=i.strings.length-2):i._$AI(t[s])),s++;}}class it{get _$AU(){return this._$AM?._$AU??this.R}constructor(t,s,i,e){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=s,this._$AM=i,this.options=e,this.R=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===t?.nodeType&&(t=s.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,s=this){t=tt(this,t,s),N(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==Z&&this.V(t):void 0!==t._$litType$?this.L(t):void 0!==t.nodeType?this.I(t):R(t)?this.j(t):this.V(t);}D(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.D(t));}V(t){this._$AH!==F&&N(this._$AH)?this._$AA.nextSibling.data=t:this.I(E.createTextNode(t)),this._$AH=t;}L(t){const{values:s,_$litType$:i}=t,e="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===e)this._$AH.O(s);else {const t=new st(e,this),i=t.N(this.options);t.O(s),this.I(i),this._$AH=t;}}_$AC(t){let s=G.get(t.strings);return void 0===s&&G.set(t.strings,s=new Y(t)),s}j(t){O(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,e=0;for(const o of t)e===s.length?s.push(i=new it(this.D(U()),this.D(U()),this,this.options)):i=s[e],i._$AI(o),e++;e<s.length&&(this._$AR(i&&i._$AB.nextSibling,e),s.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s;}}setConnected(t){void 0===this._$AM&&(this.R=t,this._$AP?.(t));}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,s,i,e,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=s,this._$AM=e,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F;}_$AI(t,s=this,i,e){const o=this.strings;let h=!1;if(void 0===o)t=tt(this,t,s,0),h=!N(t)||t!==this._$AH&&t!==Z,h&&(this._$AH=t);else {const e=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=tt(this,e[i+r],s,r),n===Z&&(n=this._$AH[r]),h||=!N(n)||n!==this._$AH[r],n===F?t=F:t!==F&&(t+=(n??"")+o[r+1]),this._$AH[r]=n;}h&&!e&&this.H(t);}H(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class ot extends et{constructor(){super(...arguments),this.type=3;}H(t){this.element[this.name]=t===F?void 0:t;}}class ht extends et{constructor(){super(...arguments),this.type=4;}H(t){this.element.toggleAttribute(this.name,!!t&&t!==F);}}class rt extends et{constructor(t,s,i,e,o){super(t,s,i,e,o),this.type=5;}_$AI(t,s=this){if((t=tt(this,t,s,0)??F)===Z)return;const i=this._$AH,e=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||e);e&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class nt{constructor(t,s,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i;}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t);}}const at=P.litHtmlPolyfillSupport;at?.(Y,it),(P.litHtmlVersions??=[]).push("3.1.1");const lt=(t,s,i)=>{const e=i?.renderBefore??s;let o=e._$litPart$;if(void 0===o){const t=i?.renderBefore??null;e._$litPart$=o=new it(s.insertBefore(U(),t),t,void 0,i??{});}return o._$AI(t),o};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ut extends ${constructor(){super(...arguments),this.renderOptions={host:this},this.ot=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.ot=lt(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this.ot?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this.ot?.setConnected(!1);}render(){return Z}}ut._$litElement$=!0,ut[("finalized")]=!0,globalThis.litElementHydrateSupport?.({LitElement:ut});const dt=globalThis.litElementPolyfillSupport;dt?.({LitElement:ut});(globalThis.litElementVersions??=[]).push("4.0.3");

/*
 * Events used to communicate data throughout the app
 */

const AppEvents = {
  // navigate to a panel in the UI
  NAVIGATE: "navigate",
  // update a search query
  SEARCH: "search",
  // view a bookmark or card
  VIEW_CARD: "view-card",
  // add a new bookmark or card
  ADD_CARD: "add-card",
  // delete a bookmark or card
  DELETE_CARD: "delete-card",
  // add a new database to the sidebar
  ADD_DATABASE: "add-database",
  // add concept to a card
  ADD_CONCEPT: "add-concept",
  // delete a database
  DELETE_DATABASE: "delete-database",
  // announce a database is being synced
  DATABASE_SYNCING: "database-syncing",
  // announce a database has been synced
  DATABASE_SYNCED: "database-synced",
  // toggle the burger menu
  TOGGLE_BURGER_MENU: "toggle-burger-menu",
  // toggle notifications
  TOGGLE_NOTIFICATIONS: "toggle-notifications",
  // database sync error
  DATABASE_SYNC_ERROR: "database-sync-error",
};

const Components = {
  ABOUT_PAGE: "about",
  VIEW_DATABASE: "view-database",
  ADD_DATABASE: "add-database",
  ADD_CONCEPT: "add-concept",
  FRONTPAGE: "frontpage",
};

const ComponentPaths = {
  [Components.ABOUT_PAGE]: "/about",
  [Components.VIEW_DATABASE]: "/topic",
  [Components.ADD_DATABASE]: "/topic/edit",
  [Components.FRONTPAGE]: "/",
};

class Navbar extends ut {
  static get properties() {
    return {
      page: {
        type: String,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAboutNavigation() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ABOUT_PAGE,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  broadcastNotificationsToggle() {
    const event = new CustomEvent(AppEvents.TOGGLE_NOTIFICATIONS, {
      detail: {},
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  broadcastBurgerToggle() {
    const event = new CustomEvent(AppEvents.TOGGLE_BURGER_MENU, {
      detail: {},
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return q`
    <header>
      <nav class="borg-navbar">
        <ul>
          <li class="navbar-button">
            <a
              @click=${this.broadcastBurgerToggle}
              href="#">☰</a>
          </li>

          <li class="navbar-button ${this.page === "about" ? "active" : ""}">
          <a
            @click=${this.broadcastAboutNavigation}
            href="#">About</a>

          <li class="navbar-button navbar-divider"> </li>

          <li
            @click=${this.broadcastNotificationsToggle}
            class="navbar-button navbar-bell-icon">
            <a href="#">🔔</a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("borg-navbar", Navbar);

class Database extends ut {
  static get properties() {
    return {
      alias: { type: String },
      syncing: { type: Boolean },
      active: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastViewDatabase() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.VIEW_DATABASE,
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  broadcastChangeSettings() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_DATABASE,
        alias: this.alias,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const classList = ["borg-database"];

    if (this.active) {
      classList.push("active");
    }
    if (this.syncing) {
      classList.push("syncing");
    }

    return q`
    <li class="${classList.join(" ")}">
      <span
        @click=${this.broadcastViewDatabase}
        class="database-name">${this.alias}</span>

      <span
        title="Settings"
        @click=${this.broadcastChangeSettings}
        class="database-settings">⚙</span>
    </li>
    `;
  }
}

customElements.define("borg-database", Database);

class AddDatabase extends ut {
  static get properties() {
    return {
      active: { type: Boolean },
      selectedDatabase: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddTopic() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_DATABASE,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const classList = ["sidebar-heading-button"];

    if (this.active && !this.selectedDatabase) {
      classList.push("active");
    }

    return q`
    <li class="borg-sidebar-heading">
      <span class="sidebar-heading">Topics</span>
      <span
        title="Add Topic"
        @click=${this.broadcastAddTopic}
        id="add-topic"
        class="${classList.join(" ")}">+</span>
    </li>
    `;
  }
}

class AddConcept extends ut {
  static get properties() {
    return {
      active: { type: Boolean },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddConcept() {
    const event = new CustomEvent(AppEvents.NAVIGATE, {
      detail: {
        component: Components.ADD_CONCEPT,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    const classList = ["sidebar-heading-button"];

    if (this.active && !this.selectedDatabase) {
      classList.push("active");
    }

    return q`
    <li class="borg-sidebar-heading">
      <span class="sidebar-heading">Concepts</span>
      <span
        title="Add Concept"
        @click=${this.broadcastAddConcept}
        id="add-concept"
        class="${classList.join(" ")}">+</span>
    </li>
    `;
  }
}

class SidebarDivider extends ut {
  createRenderRoot() {
    return this;
  }

  render() {
    return q`
    <li class="borg-sidebar-heading">
      <span class="sidebar-heading"></span>
    </li>
    `;
  }
}

class Sidebar extends ut {
  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
      syncState: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  renderDatabases() {
    return q`
    <ul>
      ${
      Object.values(this.databases).map((db) => {
        const active = this.selectedDatabase === db.alias;
        const syncing = this.syncState[db.alias] === "syncing";

        return q`<borg-database .syncing=${syncing} .active=${active} .alias=${db.alias}></borg-database>`;
      })
    }
    </ul>
    `;
  }

  render() {
    return q`
    <aside class="borg-sidebar">
      <borg-add-database .active=${
      this.page === "add-database"
    } .selectedDatabase=${this.selectedDatabase}></borg-add-database>
      ${this.renderDatabases()}

      <borg-sidebar-divider></borg-sidebar-divider>
      </aside>
    `;
  }
}

customElements.define("borg-sidebar-divider", SidebarDivider);
customElements.define("borg-add-database", AddDatabase);
customElements.define("borg-add-concept", AddConcept);
customElements.define("borg-sidebar", Sidebar);

class Notification extends ut {
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
    return q`
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

class Notifications extends ut {
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
        return q`<borg-notification
          status=${notification.status}
          time=${notification.time}
          message=${notification.message}></borg-notification>`;
      });

    return q`
    <ul>
      ${notifications}
    </ul>
    `;
  }
}

customElements.define("borg-notification", Notification);
customElements.define("borg-notifications", Notifications);

class AboutPage extends ut {
  createRenderRoot() {
    return this;
  }

  render() {
    return q`
      <div class="frontpage-cnt">
        <h2>About</h2>
      </div>
    `;
  }
}

customElements.define("borg-about", AboutPage);

class Frontpage extends ut {
  createRenderRoot() {
    return this;
  }

  render() {
    return q`
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

class Log extends ut {
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

    return q`
    <div class="log-entry">
      <span class="log-time">[${time}]</span>
      <span class="log-message">${this.log.message}</span>
    </div>
    `;
  }
}

customElements.define("borg-log-entry", Log);

class LogPanel extends ut {
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
      return q`
      <p class="last-update-time">
        Not updated yet
      </p>
      `;
    }

    return q`
    <p class="last-update-time">
      Updated ${lastUpdateTime.toISOString()}
    </p>
    `;
  }

  render() {
    return q`
    <details class="log-panel-cnt">
      <summary>
        <h3>Sync</h3>

        ${this.renderLastUpdateTime()}
      </summary>

      <pre class="log-panel">
        <code>
        ${
      this.logs.map((log) => {
        return q`<borg-log-entry .log=${log}></borg-log-entry>`;
      })
    }
        </code>
      </pre>
    </details>
    `;
  }
}

customElements.define("borg-log-panel", LogPanel);

class ViewDeletedCards extends ut {
  createRenderRoot() {
    return this;
  }

  render() {
    return q`
    <div>

    </div>
    `;
  }
}

class AddDatabasePage extends ut {
  static get properties() {
    return {
      database: {
        type: Object,
      },
      logs: {
        type: Array,
      },
      lastUpdateTime: {
        type: Date,
      },
    };
  }
  createRenderRoot() {
    return this;
  }

  getForm() {
    const alias = document.querySelector("#alias");
    const url = document.querySelector("#url");
    const topic = document.querySelector("#topic");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    return {
      alias: alias.value,
      url: url.value,
      topic: topic.value,
      username: username.value,
      password: password.value,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const data = this.getForm(event);

    if (!data.alias) {
      return;
    }

    const custom = new CustomEvent(AppEvents.ADD_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    this.dispatchEvent(custom);
  }

  onDelete(event) {
    event.preventDefault();

    const data = this.getForm(event);

    const custom = new CustomEvent(AppEvents.DELETE_DATABASE, {
      bubbles: true,
      composed: true,
      detail: data,
    });
    this.dispatchEvent(custom);
  }

  renderAlias(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="A memorable name for this common-storage topic" for="alias">Alias</label>
      <br/>
      <input spellcheck="false" ?readonly=${this.database} class="borg-input borg-input-narrow" type="text" id="alias" name="alias" value="${
      db?.alias ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderUrl(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="A common-storage server URL" for="url">URL</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="url" id="url" name="url" value="${
      db?.url ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderTopic(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="A common-storage topic"  for="topic">Topic</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="text" id="topic" name="topic" value="${
      db?.topic ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderAuthenticationScheme(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="An authentication-scheme" for="authentication-scheme">Scheme</label>
      <br/>

      <select class="borg-selector" name="authentication-scheme">
        <option value="Basic Authentication">Basic Authentication</option>
      </select>
    </div>
    `;
  }

  renderUsername(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="A username with read-write permission to this topic" for="username">Username</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="text" id="username" name="username" value="${
      db?.username ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderPassword(db) {
    return q`
    <div class="borg-input-cnt">
      <label title="A password with read-write permission to this topic" for="password">Password</label>
      <br/>
      <input spellcheck="false" class="borg-input borg-input-narrow" type="password" id="password" name="password" value="${
      db?.password ?? ""
    }"/>
      <br/>
    </div>
    `;
  }

  renderSubmitButton() {
    const text = this.database ? "Update Topic" : "Add Topic";

    return q`
      <button
        class="submit-button"
        @click=${this.onSubmit}
        type="submit">${text}</button>
      `;
  }

  renderDeleteButton() {
    return q`
      <button
        class="submit-button danger"
        class="delete-button"
        @click=${this.onDelete}
        type="submit">Remove Topic</button>
      `;
  }

  render() {
    const db = this.database;
    const text = this.database ? "Update Topic" : "Add Topic";

    const buttons = this.database
      ? q`
        ${this.renderSubmitButton()}
        <div class="button-divider"></div>
        ${this.renderDeleteButton()}`
      : q`${this.renderSubmitButton()}`;

    return q`
    <h2>${text}</h2>

    <borg-view-deleted-cards>
    </borg-view-deleted-cards>

    <form id="borg-add-machine-form">
      <h3>Database Settings</h3>

      ${this.renderAlias(db)}
      ${this.renderUrl(db)}
      ${this.renderTopic(db)}

      <div class="divider"></div>

      <h3>Authentication</h3>

      ${this.renderAuthenticationScheme(db)}
      ${this.renderUsername(db)}
      ${this.renderPassword(db)}

      <br/>

      ${buttons}
    </form>
    `;
  }
}

customElements.define("borg-view-deleted-cards", ViewDeletedCards);
customElements.define("borg-add-database-page", AddDatabasePage);

class AddConceptPage extends ut {
  createRenderRoot() {
    return this;
  }

  render() {
    return q`
    <h2>Add Concept</h2>


    `;
  }
}

customElements.define("borg-add-concept-page", AddConceptPage);

class CommonStorageAPI {
  static TOPIC_BOOKMARKS = "bookmarks";

  constructor(endpoint, credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
  }

  headers() {
    const { username, password } = this.credentials;

    return new Headers({
      "content-type": "application/json",
      authorization: `Basic ${btoa(username + ":" + password)}`,
    });
  }

  async postTopic(topic) {
    try {
      const res = await fetch(`${this.endpoint}/topic/${topic}`, {
        method: "post",
        mode: "cors",
        headers: this.headers(),
        body: JSON.stringify({
          description: "A topic created by borg",
        }),
      });

      const status = res.status;

      if (status === 401) {
        return {
          state: "unauthorised",
        };
      } else if (status === 200) {
        return {
          state: "ok",
        };
      } else {
        return {
          state: "error",
          reason: `Unexpected status code: ${status}`,
        };
      }
    } catch (err) {
      return {
        state: "error",
        reason: err,
      };
    }
  }

  async postContent(topic, content) {
    try {
      const body = JSON.stringify({
        content: [content],
      });

      const res = await fetch(`${this.endpoint}/content/${topic}`, {
        method: "post",
        mode: "cors",
        headers: this.headers(),
        body,
      });

      const status = res.status;

      if (status === 401) {
        return {
          state: "unauthorised",
        };
      } else if (status === 200) {
        const body = await res.json();
        return {
          state: "ok",
          total: body.stats.total,
        };
      } else {
        return {
          state: "error",
        };
      }
    } catch (err) {
      console.error(err);
      return {
        state: "error",
      };
    }
  }

  async *getContent(topic, startId) {
    while (true) {
      console.log(`fetching from ${startId}`);

      const params = typeof startId !== "undefined"
        ? `?startId=${startId}`
        : "";

      const res = await fetch(`${this.endpoint}/content/${topic}${params}`, {
        mode: "cors",
        headers: this.headers(),
      });

      const data = await res.json();
      if (data.content.length === 0) {
        break;
      }

      for (const content of data.content) {
        yield {content, nextId: data.nextId};
      }

      if (data.nextId === startId) {
        break;
      }

      startId = data.nextId;
    }
  }
}

function promisifyRequest(r) {
  return new Promise(function (e, t) {
    r.oncomplete = r.onsuccess = function () {
      return e(r.result);
    },
      r.onabort = r.onerror = function () {
        return t(r.error);
      };
  });
}
function createStore(e, n) {
  var t = indexedDB.open(e),
    o = (t.onupgradeneeded = function () {
      return t.result.createObjectStore(n);
    },
      promisifyRequest(t));
  return function (t, r) {
    return o.then(function (e) {
      return r(e.transaction(n, t).objectStore(n));
    });
  };
}
var defaultGetStoreFunc;
function defaultGetStore() {
  return defaultGetStoreFunc = defaultGetStoreFunc ||
    createStore("keyval-store", "keyval");
}
function get(t) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readonly", function (e) {
      return promisifyRequest(e.get(t));
    });
}
function set(t, r) {
  return (2 < arguments.length && void 0 !== arguments[2]
    ? arguments[2]
    : defaultGetStore())("readwrite", function (e) {
      return e.put(r, t), promisifyRequest(e.transaction);
    });
}
function del(t) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readwrite", function (e) {
      return e.delete(t), promisifyRequest(e.transaction);
    });
}

/*
 * Event describing bookmark creation
 */
function AddBookmark(url) {
  const now = new Date();
  const id = `urn:bookmark:${now.getTime()}`;

  return {
    source: "https://github.com/rgrannell1/borg/spec/bookmark.json",
    id,
    time: now.toISOString(),
    type: "xyz.rgrannell.bookmark.add.v1",
    specversion: "1.0",
    datacontenttype: "application/json",
    data: JSON.stringify({
      url,
      id,
      created_at: now.toISOString(),
    })
  };
}

function DeleteBookmark(bookmark_id) {
  const now = new Date();
  const id = `urn:bookmark_deletion:${now.getTime()}`;

  return {
    source: "https://github.com/rgrannell1/borg/spec/bookmark_deletion.json",
    id,
    time: now.toISOString(),
    type: "xyz.rgrannell.bookmark.delete.v1",
    specversion: "1.0",
    datacontenttype: "application/json",
    data: JSON.stringify({
      id,
      bookmark_id,
      created_at: now.toISOString(),
    })
  }
}

class ClientStorageEvents {
  static databaseSyncing(alias, maxId) {
    return new CustomEvent(AppEvents.DATABASE_SYNCING, {
      detail: {
        alias,
        maxId,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }

  static databaseSynced(alias) {
    return new CustomEvent(AppEvents.DATABASE_SYNCED, {
      detail: {
        alias,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }

  static databaseSyncError(database, maxId, error) {
    return new CustomEvent(AppEvents.DATABASE_SYNC_ERROR, {
      detail: {
        database,
        maxId,
        error,
        time: new Date(),
      },
      bubbles: true,
      composed: true,
    });
  }
}

class ClientStorage {
  static async getDatabases() {
    const db = await get("borg_databases");
    return db ?? {};
  }

  static setDatabases(databases) {
    return set("borg_databases", databases);
  }

  static async getDatabaseMaxId(database) {
    const value = await get(`borg_database_${database.alias}_max_id`);
    return value ?? 0;
  }

  static async setDatabaseMaxId(database, maxId) {
    return set(`borg_database_${database.alias}_max_id`, maxId);
  }

  static async getDatabaseContent(database) {
    const val = await get(`borg_database_${database.alias}_content`);
    return val ?? [];
  }

  static async setDatabaseContent(database, content) {
    return set(`borg_database_${database.alias}_content`, content);
  }

  static async databaseFetch() {
  }

  static async getConcepts() {
    const concepts = await get("borg_concepts");
    return concepts ?? [];
  }

  static async setConcepts(concepts) {
    return set("borg_concepts", concepts);
  }

  static async *sync() {
    // TODO: block when sync is initialised for a topic

    const databases = await ClientStorage.getDatabases();

    for (const database of Object.values(databases)) {
      console.log(`database: ${database.alias} sync`);

      const client = new CommonStorageAPI(database.url, {
        username: database.username,
        password: database.password,
      });

      const maxId = await ClientStorage.getDatabaseMaxId(database);
      const currentContent = await ClientStorage.getDatabaseContent(database);

      // announce we are syncing
      yield ClientStorageEvents.databaseSyncing(database.alias, maxId);

      let contentId = maxId;

      try {
        for await (const {content, nextId} of client.getContent(database.topic, maxId)) {
          currentContent.push(content);
          contentId = nextId;

          // periodically update to show sync-status
          if (contentId % 250 === 0) {
            yield ClientStorageEvents.databaseSyncing(
              database.alias,
              contentId,
            );
          }
        }
      } catch (err) {
        yield ClientStorageEvents.databaseSyncError(database, contentId, err);
        continue;
      }

      await ClientStorage.setDatabaseContent(database, currentContent);
      await ClientStorage.setDatabaseMaxId(database, contentId);

      // announce we are done syncing this database
      yield ClientStorageEvents.databaseSynced(database.alias);
    }
  }

  static async writeTopic(database, topic) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postTopic(topic);
  }

  static async writeCard(database, url) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postContent(database.topic, AddBookmark(url));
  }

  static async deleteCard(database, id) {
    const client = new CommonStorageAPI(database.url, {
      username: database.username,
      password: database.password,
    });

    return await client.postContent(database.topic, DeleteBookmark(id));
  }

  static async clearCards(database) {
    await del(`borg_database_${database.alias}_content`);
    await del(`borg_database_${database.alias}_max_id`);
  }
}

class DateTime {
  static nthNumber(number) {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  static formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  static verbalDate(date) {
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });
    const day = date.getDate();

    if (
      new Date().getDate() === day &&
      new Date().getMonth() === date.getMonth() &&
      new Date().getFullYear() === year
    ) {
      return "Today";
    }

    const thisYear = new Date().getFullYear();
    if (year === thisYear) {
      return `${day}${DateTime.nthNumber(day)} ${month}`;
    } else {
      return `${day}${DateTime.nthNumber(day)} ${month}, ${year}`;
    }
  }
}

class DateSummary extends ut {
  static get properties() {
    return {
      date: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const title = new Date(this.date).toLocaleDateString();
    return q`
    <section class="date-summary" title=${title}>
      <p>${DateTime.formatDate(new Date(this.date))}</p>
    </section>
    `;
  }
}

customElements.define("date-summary", DateSummary);

class Card extends ut {
  static TEXT_CUTOFF = 85;

  static get properties() {
    return {
      content: { type: Object },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastViewCard(event) {
    const dispatched = new CustomEvent(AppEvents.VIEW_CARD, {
      detail: { content: this.content },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  broadcastDeleteCard(event) {
    const dispatched = new CustomEvent(AppEvents.DELETE_CARD, {
      detail: { content: this.content },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    const date = new Date(this.content.created_at);
    const title = date.toLocaleString();
    const url = this.content.url;

    const urlTitle = url.length > Card.TEXT_CUTOFF
      ? url.slice(0, Card.TEXT_CUTOFF) + "..."
      : url;

    return q`
    <section class="card" @click=${this.broadcastViewCard}>
      <p class="card-url">
        <a href=${url} target="_blank">${urlTitle}</a>
      </p>
      <p class="card-date" title=${title}>${DateTime.formatTime(date)}</p>
      <span class="delete-card" @click=${this.broadcastDeleteCard} role="button">x</span>
    </section>
    `;
  }
}

customElements.define("borg-card", Card);

class SearchBar extends ut {
  static get properties() {
    return {
      query: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastQuery(event) {
    const query = event.target.value;

    const dispatched = new CustomEvent(AppEvents.SEARCH, {
      detail: { query },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    return q`
    <input
      id="search-cards"
      enterkeyhint="search"
      inputmode="text"
      class="borg-input"
      value=${this.query}
      spellcheck="false"
      @keyup=${this.broadcastQuery}
      placeholder="Search" />
    `;
  }
}

customElements.define("borg-search-bar", SearchBar);

class Assembler {
  static assembleBookmarks(events) {
    const bookmarks = [];

    const idSet = new Set();

    for (const event of events) {
      if (!event) {
        console.error("event is undefined");
        continue;
      }

      if (event.type !== "xyz.rgrannell.bookmark.add.v1") {
        continue;
      }

      // bug workaround!
      const data = JSON.parse(event.data);
      if (idSet.has(data.id)) {
        continue;
      }

      bookmarks.push(data);
      idSet.add(data.id);
    }

    bookmarks.sort((left, right) => {
      const dateLeft = new Date(left.created_at).getTime();
      const dateRight = new Date(right.created_at).getTime();

      return dateLeft - dateRight;
    });

    return bookmarks;
  }
}

class CardsPanel extends ut {
  static get properties() {
    return {
      query: { type: String },
      database: { type: Object },
      content: { type: Array },
    };
  }

  constructor() {
    super();
    this.content = [];
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    if (!this.database) {
      return;
    }

    this.content = Assembler.assembleBookmarks(
      await ClientStorage.getDatabaseContent(this.database),
    );

    this.requestUpdate();
  }

  renderDate(date) {
    return q`
    <li>
      <date-summary .date=${date}></date-summary>
    </li>
    `;
  }

  renderCard(entry) {
    return q`
    <li>
      <borg-card .content=${entry}></borg-card>
    </li>
    `;
  }

  matchesSet(entry) {
    if (!this.query) {
      return true;
    }

    return entry.url.toLowerCase().includes(this.query);
  }

  render() {
    const entries = [];
    let lastDate = undefined;

    for (const entry of this.content) {
      if (!this.matchesSet(entry)) {
        continue;
      }

      const date = entry.created_at;

      // buggy
      const createdAt = DateTime.formatDate(new Date(date));
      const previousDate = DateTime.formatDate(new Date(lastDate));

      if (createdAt !== previousDate) {
        entries.push(this.renderDate(date));
        lastDate = date;
      }

      entries.push(this.renderCard(entry));
    }

    if (entries.length > 0) {
      return q`
      <ol class="cards">
        ${entries.reverse()}
      </ol>
      `;
    } else {
      return q`
      <div class="empty">
        <pre>
          <code>
88                                           .
88                                           .
88                                           .
88,dPPYba,   ,adPPYba,  8b,dPPYba,  ,adPPYb,d8
88P'    "8a a8"     "8a 88P'   "Y8 a8"    'Y88
88       d8 8b       d8 88         8b       88
88b,   ,a8" "8a,   ,a8" 88         "8a,   ,d88
8Y"Ybbd8"'   '"YbbdP"'  88          '"YbbdP"Y8
                                    aa,    ,88
                                      "Y8bbdP"
          </code>
        </pre>
      </div>
      `;
    }
  }
}

customElements.define("borg-cards-panel", CardsPanel);

class CardInput extends ut {
  constructor() {
    super();
    this.saveState = "default";
  }

  static get properties() {
    return {
      database: { type: Object },
      saveState: { type: String },
      bookmarkCount: { type: Number },
      focusedCard: { type: Object },
      syncTime: { type: Date }
    };
  }

  createRenderRoot() {
    return this;
  }

  broadcastAddCard(event) {
    event.preventDefault();

    const url = document.getElementById("bookmark-url").value;

    if (!url) {
      return;
    }

    const dispatched = new CustomEvent(AppEvents.ADD_CARD, {
      detail: {
        alias: this.database.alias,
        url,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  buttonText() {
    const state = this.saveState;

    if (state === "ok") {
      return this.bookmarkCount ? `Added ${this.bookmarkCount}` : `Added`;
    } else if (state === "error") {
      return "Failed";
    } else if (state === "unauthorized") {
      return "Not Authorised";
    } else if (state === "saving") {
      return "Adding...";
    } else {
      return "Add";
    }
  }

  render() {
    const state = this.saveState;
    const classes = ["submit-button"];

    if (state === "ok") {
      classes.push("submit-ok");
    } else if (state === "saving") {
      classes.push("submit-saving");
    } else if (state === "error") {
      classes.push("submit-error");
    } else if (state === "unauthorized") {
      classes.push("submit-unauthorized");
    }

    // todo handle focused card

    return q`
    <input
      spellcheck="false"
      id="bookmark-url"
      autocomplete="off"
      inputmode="url"
      type="url"
      enterhint="send"
      class="borg-input"
      placeholder="URL" />
    <button
      id="submit-bookmark"
      class="${classes.join(" ")}"
      @click=${this.broadcastAddCard}>${this.buttonText()}</button>
    `;
  }
}

customElements.define("borg-card-input", CardInput);

class ViewDatabasePage extends ut {
  static get properties() {
    return {
      focusedCard: { type: Object },
      totalBookmarks: { type: Number },
      saveState: { type: String },
      database: { type: Object },
      query: { type: String },
      syncTime: { type: Date },
    };
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    for await (const event of ClientStorage.sync()) {
      this.dispatchEvent(event);
    }

    this.syncTime = new Date();
    this.requestUpdate();
  }

  resetButton() {
    setTimeout(() => {
      if (this.saveState !== "saving") {
        this.saveState = "default";
        this.requestUpdate();
      }
    }, 3_500);
  }

  async addCard(event) {
    this.saveState = "saving";
    const res = await ClientStorage.writeCard(this.database, event.detail.url);

    this.totalBookmarks = res.totalBookmarks;
    this.saveState = res.state;

    this.resetButton();

    for await (const event of ClientStorage.sync()) {
      this.dispatchEvent(event);
    }
    this.syncTime = new Date();
  }

  async deleteCard(event ) {
    await ClientStorage.deleteCard(this.database, event.detail.content);
    this.totalBookmarks -= 1;
    this.requestUpdate();
  }

  viewCard(event) {
    this.focusedCard = event.detail.content;
  }

  render() {
    return q`
    <borg-search-bar
      .query=${this.query}></borg-search-bar>

    <borg-cards-panel
      @view-card=${this.viewCard}
      @delete-card=${this.deleteCard}
      .syncTime=${this.syncTime}
      .query=${this.query}
      .database=${this.database}></borg-cards-panel>

    <borg-card-input
      @add-card=${this.addCard}
      .syncTime=${this.syncTime}
      .saveState=${this.saveState}
      .focusedCard=${this.focusedCard}
      .database=${this.database}></borg-card-input>
    `;
  }
}

customElements.define("borg-view-database-page", ViewDatabasePage);

class UrlRoute {
  static getState() {
    return {};
  }
  static setState(params) {
    const url = new URL(location);

    for (const [key, value] of Object.entries(params)) {
      if (key === "page" || key === "topic") {
        continue;
      }

      url.searchParams.set(key, value);
    }

    if (params.page) {
      url.hash = params.topic
        ? `#${ComponentPaths[params.page]}/${params.topic}`
        : `#${ComponentPaths[params.page]}`;
    }

    history.pushState({}, "", url);
  }
}

class Media {
  static isNarrowDevice() {
    return window.matchMedia("(max-width: 600px)").matches;
  }
}

class App extends ut {
  constructor() {
    super();
    this.page = Components.FRONTPAGE;
    this.databases = {};
    this.syncState = {};
    this.notifications = [];
    this.showSidebar = true;
    this.showNotifications = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.databases = await ClientStorage.getDatabases();
    this.requestUpdate();
  }

  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      page: { type: String },
      selectedDatabase: { type: String },
      databases: { type: Object },
      syncState: { type: Object },
      concepts: { type: Object },
      showSidebar: { type: Boolean },
      showNotifications: { type: Boolean },
    };
  }

  async handleDeleteDatabase(event) {
    const alias = event.detail.alias;

    await ClientStorage.clearCards({
      alias,
    });

    delete this.databases[alias];
    this.databases = { ...this.databases };

    await ClientStorage.setDatabases(this.databases);

    delete this.selectedDatabase;
    await this.requestUpdate();
  }

  async handleAddTopic(event) {
    this.databases = {
      ...this.databases,
      [event.detail.alias]: event.detail,
    };

    const res = await ClientStorage.writeTopic(
      event.detail,
      event.detail.topic,
    );
    console.log("add-topic-res", res);

    await ClientStorage.setDatabases(this.databases);
    this.selectedDatabase = event.detail.alias;
  }

  async handleAddConcept(event) {
    this.concepts = {
      ...this.concepts,
      [event.detail.alias]: event.detail,
    };

    await ClientStorage.setConcepts(this.concepts);
  }

  async handleDatabaseSyncing(event) {
    this.syncState[event.detail.alias] = "syncing";
    this.syncState = { ...this.syncState };

    this.notifications.push({
      status: "info",
      message: `Syncing ${event.detail.alias} from #${event.detail.maxId}`,
      time: event.detail.time,
    });

    this.notifications = [...this.notifications];
  }

  async handleDatabaseSyncError(event) {
    this.syncState[event.detail.alias] = "synced";

    // todo create a flashy animation
    this.syncState = { ...this.syncState };

    this.notifications.push({
      status: "error",
      message: `Failed to sync ${event.detail.alias}\n${
        event.detail?.error?.message ?? ""
      }`,
      time: event.detail.time,
    });

    this.notifications = [...this.notifications];
  }

  async handleDatabaseSynced(event) {
    this.syncState[event.detail.alias] = "synced";

    // todo create a flashy animation
    this.syncState = { ...this.syncState };

    this.notifications.push({
      status: "info",
      message: `Synced ${event.detail.alias}`,
      time: event.detail.time,
    });

    this.notifications = [...this.notifications];
  }

  async handleToggleBurgerMenu(event) {
    this.showSidebar = !this.showSidebar;

    // if we're on mobile, we need to disable notifications
    if (this.showSidebar && Media.isNarrowDevice()) {
      this.showNotifications = false;
    }
  }

  async handleToggleNotifications(event) {
    this.showNotifications = !this.showNotifications;

    // if we're on mobile, we need to disable notifications
    if (this.showNotifications && Media.isNarrowDevice()) {
      this.showSidebar = false;
    }
  }

  async handleSearch(event) {
    UrlRoute.setState({
      query: event.detail.query,
    });

    this.query = event.detail.query;
    this.requestUpdate();
  }

  navigate(event) {
    const detail = event.detail;

    // if we're on a narrow device, hide the sidebar
    if (Media.isNarrowDevice()) {
      this.showSidebar = false;
    }

    if (detail.component === Components.ABOUT_PAGE) {
      delete this.selectedDatabase;

      this.page = Components.ABOUT_PAGE;
    } else if (detail.component === Components.ADD_DATABASE) {
      this.page = Components.ADD_DATABASE;
      // if none, treat as a new database form
      this.selectedDatabase = detail?.alias;
    } else if (detail.component === Components.VIEW_DATABASE) {
      this.page = Components.VIEW_DATABASE;
      this.selectedDatabase = detail.alias;
    } else if (detail.component === Components.ADD_CONCEPT) {
      delete this.selectedDatabase;
      this.page = Components.ADD_CONCEPT;
    }

    // given the navigation change, update the URL
    UrlRoute.setState({
      page: this.page,
      topic: this.selectedDatabase,
    });

    this.requestUpdate();
  }

  renderAddDatabasePage() {
    const db = this.databases[this.selectedDatabase];

    return q`<borg-add-database-page
      .lastUpdateTime="PLACEHOLDER"
      .database=${db}>
    </borg-add-database-page>`;
  }

  renderViewDatabasePage() {
    const db = this.databases[this.selectedDatabase];

    return q`<borg-view-database-page .database=${db} .query=${this.query}></borg-view-database-page>`;
  }

  renderAboutPage() {
    return q`<borg-about></borg-about>`;
  }

  renderSubpage() {
    let subpage = q`<borg-frontpage></borg-frontpage>`;

    if (this.page === Components.ADD_DATABASE) {
      subpage = this.renderAddDatabasePage();
    } else if (this.page === Components.VIEW_DATABASE) {
      subpage = this.renderViewDatabasePage();
    } else if (this.page === Components.ABOUT_PAGE) {
      subpage = this.renderAboutPage();
    } else if (this.page === Components.ADD_CONCEPT) {
      subpage = q`<borg-add-concept-page></borg-add-concept-page>`;
    } else if (this.page === Components.VIEW_DELETED) {
      subpage = q`<borg-view-deleted-page></borg-view-deleted-page>`;
    }

    return subpage;
  }

  render() {
    console.log("app: render");

    const classList = ["app-cnt"];

    if (this.showSidebar) {
      classList.push("show-sidebar");
    }

    if (this.showNotifications) {
      classList.push("show-notifications");
    }

    return q`
    <div class="${classList.join(" ")}"
      @navigate=${this.navigate}
      @search=${this.handleSearch}
      @delete-database=${this.handleDeleteDatabase}
      @database-syncing=${this.handleDatabaseSyncing}
      @database-sync-error=${this.handleDatabaseSyncError}
      @database-synced=${this.handleDatabaseSynced}
      @toggle-burger-menu=${this.handleToggleBurgerMenu}
      @toggle-notifications=${this.handleToggleNotifications}
      @add-concept=${this.handleAddConcept}
      @add-database=${this.handleAddTopic}>

      <borg-navbar
        .page=${this.page}>
      </borg-navbar>

      <borg-sidebar
        .page=${this.page}
        .syncState=${this.syncState}
        .selectedDatabase=${this.selectedDatabase}
        .databases=${this.databases}>
      </borg-sidebar>

      <borg-notifications
        .notifications=${this.notifications}>
      </borg-notifications>

      ${this.renderSubpage()}
    </div>
    `;
  }
}

customElements.define("borg-app", App);

export { App };
