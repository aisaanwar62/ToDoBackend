const express = require("express");
const login = require("./login");
const register = require("./register");
const adduser = require("./adduser");
const getuser = require("./getuser");
const deleteuser = require("./deleteuser");
const edituser = require("./edituser");
const addemployee = require("./addemployee");
const getemployee = require("./getemployee");

const getemployeeverification = require("./getemployeeverification");

const routes = express.Router();

module.exports = () => {
  routes.post("/users/login", login);
  routes.post("/users/register", register);
  routes.post("/users/adduser", adduser);
  routes.get("/users/getuser", getuser);
  routes.delete("/users/deleteuser/:id", deleteuser);
  routes.patch("/users/edituser/:id", edituser);

  routes.post("/users/addemployee", addemployee);
  routes.get("/users/getemployee", getemployee);
  routes.get("/users/getemployeeverification/:id", getemployeeverification);

  return routes;
};
