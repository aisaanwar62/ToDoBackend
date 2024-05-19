const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  company: { type: String, required: true },
  email: { type: String, required: true },
  verification_code: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("employee", employeeSchema);
