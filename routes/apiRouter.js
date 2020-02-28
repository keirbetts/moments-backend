const apiRouter = require("express").Router();
const { getAllEndpoints } = require("../controllers/api-controller");
const imageRouter = require("./imageRouter");
const userRouter = require("./userRouter");
const { handle405 } = require("../errors/errors");

apiRouter
  .route("/")
  .get(getAllEndpoints)
  .all(handle405);

apiRouter.use("/upload", imageRouter);
apiRouter.use("/images", imageRouter);
apiRouter.use("/createuser", userRouter);

module.exports = apiRouter;
