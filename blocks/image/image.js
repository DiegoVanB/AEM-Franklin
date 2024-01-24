export default async function decorate(block) {
    const rows = [...block.children];
    let properties = [];
    rows.forEach(elements => {
        properties.push(elements.children);
    })
    let image = properties[0][1];
    image.querySelector('img').setAttribute('alt', properties[1][1].innerText.trim());
    block.innerHTML = '';
    block.appendChild(image);
  }