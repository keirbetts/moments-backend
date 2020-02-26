const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRouter);

module.exports = app;
