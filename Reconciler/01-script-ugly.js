function createDomElements(data) {
  let parentElement = document.getElementById("mainArea");

  parentElement.innerHTML = "";

  let added = 0;

  data.forEach((element) => {
    let childElement = document.createElement("div");
    childElement.setAttribute("id", element.id);

    let grandChildElement1 = document.createElement("span");
    grandChildElement1.innerHTML = element.title;

    let grandChildElement2 = document.createElement("span");
    grandChildElement2.innerHTML = element.description;

    let grandChildElement3 = document.createElement("button");
    grandChildElement3.innerHTML = "Delete";
    grandChildElement3.setAttribute("onclick", `deleteTodo(${element.id})`);

    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);

    parentElement.appendChild(childElement);
    added++;
  });

  console.log(added);
}

window.setInterval(() => {
  let todos = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "Gym",
      description: "Go to Gym",
      id: i + 1,
    });
  }

  console.log(todos);
  createDomElements(todos);
}, 5000);
