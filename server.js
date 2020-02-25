const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const { handle404, handle400, handle500 } = require("./errors/errors");

app.use("/api", apiRouter);

app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;
