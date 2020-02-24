const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

module.exports = app;
