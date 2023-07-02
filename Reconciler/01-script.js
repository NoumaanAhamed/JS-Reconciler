function createTodos() {
  let todos = [];

  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    todos.push({
      title: "Go to gym",
      description: "Go to gym from 5",
      id: i + 1,
    });
  }

  console.log(todos);
}

setInterval(() => {
  createTodos();
}, 5000);
