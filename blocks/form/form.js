const POST_FORM = "https://admin.hlx.page/form/diegovanb/aem-franklin/main";
let POST_ENDPOINT = "";
let form =  document.createElement('form');;
async function createForm(formUrl, block){
  const {pathname} = new URL(formUrl);
  POST_ENDPOINT = pathname;
  const resp = await fetch(pathname);
  const json = await resp.json();
  form.setAttribute('action', pathname);
  json.data.forEach(inputField => {
      form.appendChild(createField(inputField.Field, inputField.Label, inputField.Placeholder, inputField.Mandatory, inputField.Type));
  });
  block.appendChild(form);
}

export default async function decorate(block) {
  const form = block.querySelector('div div').innerText
  block.querySelector('div div').innerText = '';
  await createForm(form, block);
}

export const createField = (field, label, placeholder, mandatory, type) => {
  switch(type) {
    case('submit'):
      return createSubmitButton(label)
    default:
      return createInputField(field,label, placeholder,mandatory,type)
  }
}

function constructPayload() {
  const payload = {};
  form.querySelectorAll('input').forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });
  return payload;
}

const createInputField = (field, label, placeholder, mandatory) => {
  let wrapperDiv = document.createElement('div');
  let labelElement = document.createElement('label');
  labelElement.setAttribute('for', field);
  labelElement.innerText = label;
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('for', field);
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('name', field);
  input.setAttribute('id', field);
  if(mandatory === 'X') {
      input.setAttribute('required', true);
  }
  wrapperDiv.appendChild(labelElement);
  wrapperDiv.appendChild(input);
  return wrapperDiv;
}

function createSubmitButton(label) {
  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', label);
  submit.addEventListener('click', async (e) => {
    e.preventDefault();
      const payload = constructPayload(form);
      payload.timestamp = new Date().toJSON();
      const resp = fetch(POST_FORM + POST_ENDPOINT, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: payload }),
      }).then(response => {
      });
  })
  return submit;
} 