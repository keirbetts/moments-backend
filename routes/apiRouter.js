const apiRouter = require("express").Router();
const { getAllEndpoints } = require("../controllers/api-controller");
const imageRouter = require("./imageRouter");

apiRouter.route("/").get(getAllEndpoints);

apiRouter.use("/upload", imageRouter);

module.exports = apiRouter;
