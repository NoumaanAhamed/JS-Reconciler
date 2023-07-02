let vDOM = [];

function createDomElements(existingDOM, currentDOM) {
  let parentElement = document.getElementById("mainArea");

  let added = 0,
    deleted = 0,
    updated = 0;

  currentDOM.forEach((item) => {
    let existingItem = existingDOM.find((oldItem) => {
      return oldItem.id === item.id;
    });
    if (existingItem) {
      updated++;
      let existingChild = document.getElementById(parseInt(item.id));
      existingChild.children[0].innerHTML = item.title;
      existingChild.children[1].innerHTML = item.description;
    } else {
      added++;
      var childElement = document.createElement("div");
      childElement.setAttribute("id", item.id); // Store the ID on the element for future lookups

      var grandChildElement1 = document.createElement("span");
      grandChildElement1.innerHTML = item.title;

      var grandChildElement2 = document.createElement("span");
      grandChildElement2.innerHTML = item.description;

      var grandChildElement3 = document.createElement("button");
      grandChildElement3.innerHTML = "Delete";
      grandChildElement3.setAttribute("onclick", "deleteTodo(" + item.id + ")");

      childElement.appendChild(grandChildElement1);
      childElement.appendChild(grandChildElement2);
      childElement.appendChild(grandChildElement3);
      parentElement.appendChild(childElement);
    }
  });

  existingDOM.forEach((oldItem) => {
    if (
      !currentDOM.some((item) => {
        return item.id === oldItem.id;
      })
    ) {
      deleted++;
      var childToRemove = document.getElementById(parseInt(oldItem.id));
      parentElement.removeChild(childToRemove);
    }
  });

  console.log("added: " + added);
  console.log("updated " + updated);
  console.log("deleted " + deleted);
}

function updateVirtualDom(data) {
  let existingDOM = [...vDOM];
  vDOM = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
    };
  });
  createDomElements(existingDOM, vDOM);
}

window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "Go to gym",
      description: "Go to gym from 5",
      id: i + 1,
    });
  }

  updateVirtualDom(todos);
}, 5000);
