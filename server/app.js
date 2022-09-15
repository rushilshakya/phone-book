const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const personsRouter = require("./controllers/persons");
const mongoose = require("mongoose");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.morganned);
app.use(express.static("dist"));
app.use("/api/persons", personsRouter);
app.get("/health", (req, res) => {
  res.send("ok");
});
app.get("/version", (req, res) => {
  res.send("0.0.1"); // change this string to ensure a new version deployed
});
app.use(middleware.unknownEndpoint);

// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;
