const nav_buttons = {
  list: document.getElementById("list-button"),
  add: document.getElementById("add-button"),
  edit: document.getElementById("edit-button"),
};

nav_buttons["list"].onclick = () => togglePage("list");
nav_buttons["add"].onclick = () => togglePage("add");
document.getElementById("search_button").onclick = search;
document.getElementById("reset_button").onclick = resetSearch;
document.getElementById("count_price_button").onclick = countUpPrice;
