const list_page = document.getElementById("list-page");
const grid = list_page.querySelector("#grid");

const price_text = document.getElementById("price-text");
const sort_switch = document.getElementById("switch");
sort_switch.onclick = sort_decoration;

const search_group = document.getElementById("search-group");
const search_input = search_group.querySelector("#search_input");

function buildList(decoration_list) {
  let cardTemplate = document.querySelector("#template").children[0];
  const targetChildren = [];
  for( const decoration of decoration_list) {
    let newNode = cardTemplate.cloneNode(true);
    for (const [column_name, value] of decoration.getCorrectedEntries()) {
      newNode.querySelector("#card__" + column_name).innerHTML = value;
    }
    //Edit button
    newNode.querySelector("#card__edit").onclick = () =>
      togglePage("edit", decoration);
    //Delete button
    newNode.querySelector("#card__remove").onclick = () =>on_remove(decoration.id);

    targetChildren.push(newNode);
  }
  grid.replaceChildren(...targetChildren);
}