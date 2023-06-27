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
        newTodo.innerHTML = `
              <span>${todo.Title}:</span>
              <span>${todo.Description}</span>
              <button onclick="deleteTodo(${todo.id})">Delete</button>
              <button onclick="updateTodo(${todo.id})">Update</button>
              `;
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
      newTodo.innerHTML = `
        <span>${todo.Title}:</span>
        <span>${todo.Description}</span>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
        <button onclick="updateTodo(${todo.id})">Update</button>
        `;
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
    .then(() => {
      fetchTodo();
    })
    .catch((err) => {
      console.error("Error updating todos:", err);
    });
}

submitButton.addEventListener("click", addTodo);

fetchTodo();
