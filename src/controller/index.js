const express = require(`express`);
const todo = require(`./todo`);
const users = require("./user");
const routes = express.Router();

module.exports = () => {
  routes.use("/api/todo", todo());
  routes.use("/api", users());

  return routes;
};
