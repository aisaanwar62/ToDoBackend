const express = require(`express`);
const cors = require(`cors`);
const app = express();
const routes = require(`./controller`);
PORT = 4000;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes());
// app.use("/", (res, req) => {
//   res.status(200).send({ message: "Message Send" });
// });
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
