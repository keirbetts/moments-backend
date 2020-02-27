const apiRouter = require("express").Router();
const { getAllEndpoints } = require("../controllers/api-controller");
const imageRouter = require("./imageRouter");
const { handle405 } = require("../errors/errors");

apiRouter
  .route("/")
  .get(getAllEndpoints)
  .all(handle405);

apiRouter.use("/upload", imageRouter);
apiRouter.use("/images", imageRouter);

module.exports = apiRouter;
