const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: String, // String is shorthand for {type: String}
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("user", userSchema);
