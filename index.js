const express = require("express");
const bodyParser = require("body-parser");
const task = require("./controller-task");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const appRoute = require("./route-task");
app.use("/", appRoute);

app.listen(port, () => {
  console.log("Server Berjalan di Port : http://localhost:" + port);
});

module.exports = {
  task,
};
