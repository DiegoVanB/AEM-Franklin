
import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';


export class Title extends LitElement {
  static properties = {
    title: {},
    htag: {},
    styling: {}
  };

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: red;
    }
    .header {
        color: green;
    }
  `;


  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    switch(this.htag) {
        case 'h6':
            return html`<h6 class=${this.styling}>${this.title}</h6>`;
        case 'h5':
            return html`<h5 class=${this.styling}>${this.title}</h5>`;
        case 'h4':
            return html`<h4 class=${this.styling}>${this.title}</h4>`;
        case 'h3':
            return html`<h3 class=${this.styling}>${this.title}</h3>`;
        case 'h2':
            return html`<h2 class=${this.styling}>${this.title}</h2>`;
        default:
            return html`<h1 class=${this.styling}>${this.title}</h1>`;
    }
  }
}
customElements.define('custom-title', Title);

export default async function decorate(block) {
    const rows = [...block.children];
    let properties = [];
    rows.forEach(elements => {
        properties.push(elements.children);
    })
    let title = document.createElement('custom-title');
    title.setAttribute('title', properties[0][1].innerText.trim());
    title.setAttribute('htag', properties[1][1].innerText.trim());
    title.setAttribute('styling', properties[2][1].innerText.trim());
    block.innerHTML = '';
    block.appendChild(title);
  }