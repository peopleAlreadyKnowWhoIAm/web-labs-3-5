const form_page = document.getElementById("form-page");

document.getElementById("modal_close").onclick = hideModal;

const form_ids_list = {
  name: "String",
  material: "String",
  usage: "String",
  amount_avalaible: "Number",
  colors: "String",
  length: "Number",
  lamps_per_meter: "Number",
  power: "Number",
  price: "Number",
};

const form_elements = {
  name: form_page.querySelector("#form__name"),
  material: form_page.querySelector("#form__material"),
  usage: form_page.querySelector("#form__usage"),
  amount_avalaible: form_page.querySelector("#form__amount_avalaible"),
  colors: form_page.querySelector("#form__colors"),
  length: form_page.querySelector("#form__length"),
  lamps_per_meter: form_page.querySelector("#form__lamps_per_meter"),
  power: form_page.querySelector("#form__power"),
  price: form_page.querySelector("#form__price"),
  headline: form_page.querySelector("#form__headline"),
  submit: form_page.querySelector("#form__submit"),
  error_modal: form_page.querySelector("#modal_error"),
  error_modal_text: form_page.querySelector("#modal_error_text"),
};

function inputErrorBorder(set, elem) {
  if (set) {
    elem.classList.add("form__input--error");
  } else {
    elem.classList.remove("form__input--error");
  }
}

// @return Decoratoin - generated from the form or null on error
function readFormForDecoration() {
  let willCreate = true;
  const values = [];

  for (const [key, value] of Object.entries(form_ids_list)) {
    let elem = form_elements[key];
    let val = elem.value.trim();
    if (val.length === 0) {
      inputErrorBorder(true, elem);
      willCreate = false;
      showModal("Must be filled: " + key);
      break;
    } else if (value === "Number") {
      val = Number(val);
      if (isNaN(val)) {
        inputErrorBorder(true, elem);
        willCreate = false;
        showModal("There must be a number: " + key);
        break;
      } else {
        inputErrorBorder(false, elem);
        values.push(val);
      }
    } else {
      inputErrorBorder(false, elem);
      values.push(val);
    }
  }

  if (willCreate) {
    hideModal();
    let decoration = new ElectricDecoration(...values);
    return decoration;
  } else {
    return null;
  }
}

function showModal(text) {
  form_elements["error_modal_text"].innerHTML = text;
  form_elements["error_modal"].classList.remove("no-display");
}

function hideModal() {
  form_elements["error_modal"].classList.add("no-display");
}

//
// @param type - String. Could be `add` or `edit`
// @param id - Number. Integer, position of the decoration in the list. Only if edit
function prepareForm(type, callback = null, decoration = null) {
  if (type === "add") {
    form_elements["headline"].innerHTML = "Add decoration";
    for (const id_form of Object.keys(form_ids_list)) {
      form_elements[id_form].value = "";
    }
  } else {
    form_elements["headline"].innerHTML = "Edit decoration";
    for (const [id_form, value] of decoration.getEntries()) {
      form_elements[id_form].value = value;
    }
  }
  form_elements["submit"].onclick = callback;
}
