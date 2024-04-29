const { todoServices } = require("../../services");
module.exports = async (req, res) => {
  return await todoServices.getTodos(req, res);
};
