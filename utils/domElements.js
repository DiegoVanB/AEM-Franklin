export const createInputField = (field, label, placeholder, mandatory) => {
    let wrapperDiv = document.createElement('div');
    let label = document.createElement('label');
    label.setAttribute('for', field);
    label.innerText = label;
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('for', field);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('name', field);
    if(mandatory === 'X') {
        input.setAttribute('required', true);
    }
    wrapperDiv.appendChild(label);
    wrapperDiv.appendChild(input);
    return wrapperDiv;
}

export const setAttribute = (attributeName, attributeValue, component) => {
    component.setAttribute(attributeName, attributeValue);
}