const decorations = [
  new ElectricDecoration(
    "Cheap christmass lights",
    "plastic",
    "for christmass",
    120,
    "blue,green,red,",
    150,
    10,
    25,
    120.5
  ),
  new ElectricDecoration(
    "Interested house ilumination",
    "plastic",
    "for christmass",
    40,
    "yellow, green, red, blue, white,",
    2500,
    15,
    150,
    1200.0
  ),
  new ElectricDecoration(
    "On window net",
    "plastic",
    "for window",
    99,
    "yellow,",
    120,
    30,
    20,
    120.0
  ),
  new ElectricDecoration(
    "Patriotical ilumiation",
    "plastic",
    "universal",
    200,
    "yellow,blue,",
    300,
    20,
    5,
    80.0
  ),
];
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

const nav_buttons = {
  list: document.getElementById("list-button"),
  add: document.getElementById("add-button"),
  edit: document.getElementById("edit-button"),
};

nav_buttons["list"].onclick = () => toggle_nav_page("list");
nav_buttons["add"].onclick = () => toggle_nav_page("add");
document.getElementById("modal_close").onclick = hideModal;
document.getElementById("search_button").onclick = search;
document.getElementById("reset_button").onclick = resetSearch;
document.getElementById("count_price_button").onclick = countUpPrice;

window.onload = () =>updateList(decorations);

const price_text = document.getElementById("price-text");
const sort_switch = document.getElementById("switch");
sort_switch.onclick = switch_sort_decoration;

const search_group = document.getElementById("search-group");
const search_input = search_group.querySelector("#search_input");
const form_page = document.getElementById("form-page");
const list_page = document.getElementById("list-page");
const grid = list_page.querySelector("#grid");

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
let current = "list";

function input__error(set, elem) {
  if (set) {
    elem.classList.add("form__input--error");
  } else {
    elem.classList.remove("form__input--error");
  }
}

// @return Decoratoin - generated from the form
function readFormForDecoration() {
  let willCreate = true;
  const values = [];

  let window = document.getElementById("form__decoration");
  for (const [key, value] of Object.entries(form_ids_list)) {
    let elem = form_elements[key];
    let val = elem.value.trim();
    if (val.length === 0) {
      input__error(true, elem);
      willCreate = false;
      showModal("Must be filled: " + key);
      break;
    } else if (value === "Number") {
      val = Number(val);
      if (isNaN(val)) {
        input__error(true, elem);
        willCreate = false;
        showModal("There must be a number: " + key);
        break;
      } else {
        input__error(false, elem);
        values.push(val);
      }
    } else {
      input__error(false, elem);
      values.push(val);
    }
  }

  if (willCreate) {
    hideModal();
    let decor = new ElectricDecoration(...values);
    console.log(decor);
    return decor;
  } else {
    console.log("not created");
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

function updateList(decoration_list = decorations) {
  let cardTemplate = document.querySelector("#template").children[0];
  console.log(cardTemplate.length);
  const targetChildren = [];
  decoration_list.map((decoration, index) => {
    let newNode = cardTemplate.cloneNode(true);
    for (const [id, value] of Object.entries(decoration)) {
      newNode.querySelector("#card__" + id).innerHTML = value;
    }
    //Edit button
    newNode.querySelector("#card__edit").onclick = () =>
      toggle_nav_page("edit", index);
    //Delete button
    newNode.querySelector("#card__remove").onclick = on_remove;

    targetChildren.push(newNode);
  });
  grid.replaceChildren(...targetChildren);
}

//
// @param type - String. Could be `add` or `edit`
// @param id - Number. Integer, position of the decoration in the list. Only if edit
function prepare_form(type, id = null) {
  if (type === "add") {
    form_elements["headline"].innerHTML = "Add decoration";
    form_elements["submit"].onclick = on_submit_add;
    for (const id_form of Object.keys(form_ids_list)) {
      form_elements[id_form].value = "";
    }
  } else {
    form_elements["headline"].innerHTML = "Edit decoration";
    let decoration = decorations[id];
    for (const [id_form, value] of Object.entries(decoration)) {
      form_elements[id_form].value = value;
    }
    form_elements["submit"].onclick = () => on_submit_edit(id);
  }
}

function on_submit_edit(id) {
  let decoration = readFormForDecoration();
  if (decoration != null) {
    decorations[id] = decoration;
    toggle_nav_page("list");
  }
}

function on_submit_add() {
  let decoration = readFormForDecoration();
  if (decoration != null) {
    decorations.push(decoration);
    toggle_nav_page("list");
  }
}

function on_remove(id) {
  decorations.splice(id, 1);
  updateList();
}

function toggle_nav_page(target, id = null) {
  nav_buttons[current].classList.remove("nav__button--active");
  if (current == "edit") {
    nav_buttons["edit"].classList.add("no-display");
  }

  if (current == "list") {
    [search_group, list_page].forEach((val) => val.classList.add("no-display"));
  } else {
    form_page.classList.add("no-display");
  }

  nav_buttons[target].classList.add("nav__button--active");
  if (target == "edit") {
    nav_buttons["edit"].classList.remove("no-display");
  }

  if (target == "list") {
    updateList(decorations);
    [search_group, list_page].forEach((val) =>
      val.classList.remove("no-display")
    );
  } else {
    prepare_form(target, id);
    form_page.classList.remove("no-display");
  }

  current = target;
}

function search() {
  let search_text = search_input.value.trim();
  if (search_text.length != 0) {
    let filtered_decoration_list = decorations.filter((value) =>
      value.name.toLowerCase().includes(search_text.toLowerCase())
    );
    updateList(filtered_decoration_list);
  } else {
    resetSearch();
  }
}

function resetSearch() {
  updateList();
}

function switch_sort_decoration() {
  let by_price = sort_switch.checked;
  if (by_price) {
    decorations.sort((a, b) => a.price - b.price);
  } else {
    decorations.sort((a, b) => a.name.localeCompare(b.name));
  }
  updateList();
}

function countUpPrice() {
  let price = decorations.reduce((a, val) => a+val.price, 0);
  price_text.innerHTML = '$ ' + price.toFixed(2);
}
