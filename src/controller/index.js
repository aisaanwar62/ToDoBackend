const express = require(`express`);
const todo = require(`./todo`);
const routes = express.Router();
module.exports = () => {
  routes.use("/api/todo", todo());

  return routes;
};
