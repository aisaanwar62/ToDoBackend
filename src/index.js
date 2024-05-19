require("dotenv").config();
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const routes = require(`./controller`);
const database = require("./config/database");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());
    app.use(routes());
    await database();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
