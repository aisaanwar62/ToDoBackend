const express = require(`express`);
const getTodo = require("./get-todo");

const router = express.Router();
const todos = [];

module.exports = () => {
  router.post("/", (req, res) => {
    const { title, id, is_completed } = req.body;
    if (!title) {
      return res.status(400).send({ error: "Title is required" });
    }
    const newTodo = {
      title: title,
      id: id,
      is_completed: is_completed || false,
    };
    todos.push(newTodo);
    console.log("inside post todos array", todos);
    console.log("inside popst newTodo object", newTodo);

    res.status(201).send({ todo: newTodo });
  });

  router.get(`/`, getTodo);
  // (req, res) => {
  //   res.send({ todos: todos });
  // });

  router.delete("/:id", (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      console.log("inside delete todos", todos);
      res.send({ message: "Todo deleted successfully" });
    } else {
      res.status(404).send({ error: "Todo not found" });
    }
  });

  router.patch("/:id", (req, res) => {
    const todoId = req.params.id;
    console.log("Received PATCH request for todo ID:", todoId);

    const { title, is_completed } = req.body;
    console.log("Request body:", req.body);

    const todoToUpdateIndex = todos.findIndex((todo) => todo.id === todoId);
    console.log("Index of todo to update:", todoToUpdateIndex);

    if (todoToUpdateIndex === -1) {
      console.log("Todo not found");
      return res.status(404).send({ error: "Todo not found" });
    }

    const todoToUpdate = todos[todoToUpdateIndex];
    if (title) {
      todoToUpdate.title = title;
    }

    if (is_completed !== undefined) {
      todoToUpdate.is_completed = is_completed;
    }

    console.log("Updated todo:", todoToUpdate);
    res.send({ todo: todoToUpdate });
  });

  return router;
};
