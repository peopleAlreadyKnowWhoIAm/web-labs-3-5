async function getAllDecorationsFromServer() {
  try {
    let decor_buf = await fetch("/decorations")
      .then((response) => response.json()
      );
    decor_buf = decor_buf.map(toClass); 
    console.log("Getted: ", decor_buf);
    return decor_buf;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function getDecorationById(id){
  try {
    let decoration_buf = await fetch("/decorations/"+id)
    .then((val) => {
      let obj = val.json();
      return toClass(obj);
    })
    .catch((reason) => {
      console.log(reason);
      return null;
    });
    console.log("Got by id: " + id + ", obj: " + decoration_buf);
    return decoration_buf;
  } catch(error) {
    console.log(error);
  }
  return null;
}

async function createDecoration(decoration) {
  try {
    const response = await fetch("/decorations", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(decoration),
    })
    console.log("Created: "+ decoration);
  } catch(error) {
    console.log(error);
  }
}

async function updateDecoration(id, decoration) {
  try {
    const response = await fetch("/decorations/"+id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(decoration),
    })
    console.log('Updated on ' + id + ': ' + decoration);
  } catch(error) {
    console.log(error);
  }
}

async function deleteDecoration(id) {
  try {
    const response = await fetch("/decorations/"+id, {
      method: "DELETE",
    });
    console.log("Deleted by id: " + id);
  } catch (error) {
    console.log(error);
  }
}

// @param - deserialized answer
// @return - `decoration` by model
function toClass(obj) {
  let model_buf = new ElectricDecoration();
  Object.assign(model_buf, obj);
  return model_buf;
}
