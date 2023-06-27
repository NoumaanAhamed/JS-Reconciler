const express = require("express");
const path = require("path");
// const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const file = "data.json";
const options = "utf-8";

//!for separate app.js
app.use(express.static(__dirname));
app.use(bodyParser.json());
// app.use(cors());

app.get("/todos", (req, res) => {
  fs.readFile(file, options, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data)); //!only if sent here can be retrieved from frontend
    // res.send();
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(file, options, (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const reqTodo = todos.find((todo) => todo.id === parseInt(id));
    if (!reqTodo) {
      res.status(404).send("Todo not found");
      return;
    }
    res.json(reqTodo);
  });
});

app.post("/todos", (req, res) => {
  const { Title, Description } = req.body;
  fs.readFile(file, options, (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      Title,
      Description,
    };
    todos.push(newTodo);
    fs.writeFile(file, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.send(newTodo);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(file, options, (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const reqTodoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
    if (reqTodoIndex === -1) {
      res.send("Todo not found");
      return;
    }
    const removedTodo = todos.splice(reqTodoIndex, 1); //!returns array
    fs.writeFile(file, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.send(removedTodo);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { Title, Description } = req.body;
  fs.readFile(file, options, (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const reqTodo = todos.find((todo) => todo.id === parseInt(id));

    if (!reqTodo) {
      res.status(404).send("Todo not found");
      return;
    }

    reqTodo.Title = Title;
    reqTodo.Description = Description;

    fs.writeFile(file, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.send(reqTodo);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log("Listening...");
});
