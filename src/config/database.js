const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};
