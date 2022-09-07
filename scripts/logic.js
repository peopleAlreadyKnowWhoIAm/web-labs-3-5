const targets = {
  list: "list",
  add: "add",
  edit: "edit",
};

let current = targets.list;

async function onSubmitEdit(decoration_to_update) {
  let decoration = readFormForDecoration();
  if (decoration != null) {
    await updateDecoration(decoration_to_update.id, decoration);
    togglePage(targets.list);
  }
}

async function onSubmitAdd() {
  let decoration = readFormForDecoration();
  if (decoration != null) {
    await createDecoration(decoration);
    togglePage(targets.list);
  }
}

async function onRemove(id) {
  await deleteDecoration(id);
  togglePage(targets.list);
}

//There are 3 possible values for `target` which are in `targets`
function togglePage(target, decoration = null) {
  nav_buttons[current].classList.remove("nav__button--active");
  if (current == targets.edit) {
    nav_buttons[targets.edit].classList.add("no-display");
  }

  if (current == targets.list) {
    //Hide search and page
    [search_group, list_page].forEach((val) => val.classList.add("no-display"));
  } else {
    form_page.classList.add("no-display");
  }

  nav_buttons[target].classList.add("nav__button--active");

  if (target == targets.edit) {
    nav_buttons[targets.edit].classList.remove("no-display");
  }

  if (target == targets.list) {
    updateAndBuildList();
    [search_group, list_page].forEach((val) =>
      val.classList.remove("no-display")
    );
  } else {
    let callback;
    //add
    if (decoration == null) {
      callback = onSubmitAdd;
    }
    //edit
    else {
      callback = () => onSubmitEdit(decoration);
    }
    prepareForm(target, callback, decoration);
    form_page.classList.remove("no-display");
  }

  current = target;
}

function sortDecoration() {
  let by_price = sort_switch.checked;
  if (by_price) {
    decorations.sort((a, b) => a.price - b.price);
  } else {
    decorations.sort((a, b) => a.id - b.id);
  }
  buildList(decorations);
}

function search() {
  let search_text = search_input.value.trim();
  if (search_text.length != 0) {
    let filtered_decoration_list = decorations.filter((value) =>
      value.name.toLowerCase().includes(search_text.toLowerCase())
    );
    buildList(filtered_decoration_list);
  } else {
    resetSearch();
  }
}

function resetSearch() {
  buildList(decorations);
}

function countUpPrice() {
  let price = decorations.reduce((a, val) => a + val.price, 0);
  price_text.innerHTML = "$ " + price.toFixed(2);
}

function updateAndBuildList() {
  getAllDecorationsFromServer().then((val) => {
    decorations = val;
    sortDecoration();
    buildList(decorations);
  });
}
