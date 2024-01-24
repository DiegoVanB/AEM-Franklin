
import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';


export class Teaser extends LitElement {
  static properties = {
    title: {},
    htag: {},
    src: {},
    cta: {},
    href: {},
    description: {}
  };

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .cmp-teaser{
        display: flex;
        gap: 20px;
    }
    .cmp-teaser__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
  `;


  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
            return html`
            <div class=cmp-teaser>
                <div class=cmp-teaser__image>
                    <img src=${this.src}/>
                </div>
                <div class=cmp-teaser__content>
                    <h1>${this.title}</h1>
                    <span>${this.description}</span>
                    <a href=${this.href}>${this.cta}</a>
                </div> 
            </div>`;
    }
}
customElements.define('custom-teaser', Teaser);

export default async function decorate(block) {
    const rows = [...block.children];
    let properties = [];
    rows.forEach(elements => {
        properties.push(elements.children);
    })
    let teaser = document.createElement('custom-teaser');
    teaser.setAttribute('src', properties[0][1].querySelector('img').src);
    teaser.setAttribute('title', properties[1][1].innerText.trim());
    teaser.setAttribute('htag', properties[2][1].innerText.trim());
    teaser.setAttribute('cta', properties[3][1].innerText.trim());
    teaser.setAttribute('href', properties[4][1].innerText.trim());
    teaser.setAttribute('description', properties[5][1].innerText.trim());

    block.innerHTML = '';
    block.appendChild(teaser);
  }