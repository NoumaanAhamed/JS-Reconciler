const todosElement = document.getElementById("todos");
const titleInput = document.getElementById("Title");
const descriptionInput = document.getElementById("Description");
const submitButton = document.getElementById("Submit");

function fetchTodo() {
  fetch("http://localhost:5000/todos") //!use http not https
    .then((res) => res.json())
    .then((todos) => {
      todosElement.innerHTML = ""; //!removes duplicates in frontend
      todos.forEach((todo) => {
        const newTodo = document.createElement("div");

        const titleChild = document.createElement("span");
        titleChild.innerHTML = todo.Title + ":";

        const descriptionChild = document.createElement("span");
        descriptionChild.innerHTML = todo.Description;

        const deleteChild = document.createElement("button");
        deleteChild.innerHTML = "Delete";
        deleteChild.setAttribute("onclick", `deleteTodo(${todo.id})`);

        const updateChild = document.createElement("button");
        updateChild.innerHTML = "Update";
        updateChild.setAttribute("onclick", `updateTodo(${todo.id})`);

        newTodo.appendChild(titleChild);
        newTodo.appendChild(descriptionChild);
        newTodo.appendChild(deleteChild);
        newTodo.appendChild(updateChild);

        newTodo.setAttribute("id", `todo-${todo.id}`);
        todosElement.appendChild(newTodo);
      });
    })
    .catch((error) => console.error("Error fetching todos:", error));
}

function addTodo() {
  const Title = titleInput.value;
  const Description = descriptionInput.value;

  fetch("http://localhost:5000/todos", {
    method: "POST",
    body: JSON.stringify({ Title: Title, Description: Description }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((todo) => {
      const newTodo = document.createElement("div");

      const titleChild = document.createElement("span");
      titleChild.innerHTML = todo.Title + ":";

      const descriptionChild = document.createElement("span");
      descriptionChild.innerHTML = todo.Description;

      const deleteChild = document.createElement("button");
      deleteChild.innerHTML = "Delete";
      deleteChild.setAttribute("onclick", `deleteTodo(${todo.id})`);

      const updateChild = document.createElement("button");
      updateChild.innerHTML = "Update";
      updateChild.setAttribute("onclick", `updateTodo(${todo.id})`);

      newTodo.appendChild(titleChild);
      newTodo.appendChild(descriptionChild);
      newTodo.appendChild(deleteChild);
      newTodo.appendChild(updateChild);

      newTodo.setAttribute("id", `todo-${todo.id}`);
      titleInput.value = "";
      descriptionInput.value = "";
      todosElement.appendChild(newTodo);
    })
    // .then(() => {
    //   titleInput.value = "";
    //   descriptionInput.value = "";
    //   fetchTodo(); //!not optimal , makes data appear immediately (add 4)
    // })
    .catch((err) => {
      console.error("Error adding todos:", err);
    });
}

function deleteTodo(id) {
  //!make it dynamic --> removeElement
  fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((todo) => {
      const removeTodo = document.getElementById(`todo-${todo[0].id}`);
      todosElement.removeChild(removeTodo);
    })
    // .then(() => {
    //   fetchTodo();
    // })
    .catch((err) => {
      console.error("Error deleting todos:", err);
    });
}

function updateTodo(id) {
  const Title = prompt("Enter new title:");
  const Description = prompt("Enter new Description:");

  fetch(`http://localhost:5000/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ Title: Title, Description: Description }), //!as in backend,Title/Description is defined
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((todo) => {
      const updateTodo = document.getElementById(`todo-${todo.id}`);

      const newTitle = updateTodo.children[0];
      newTitle.innerHTML = todo.Title + ":";

      const newDescription = updateTodo.children[1];
      newDescription.innerHTML = todo.Description;
    })
    .catch((err) => {
      console.error("Error updating todos:", err);
    });
}

submitButton.addEventListener("click", addTodo);

fetchTodo();
