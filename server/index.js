const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes");
const { defaultPort } = require("./src/config");

require("./src/database");

const app = express();
const port = defaultPort || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
