const userRouter = require("express").Router();
const { handle405 } = require("../errors/errors");
const { createUser, getUser } = require("../controllers/user-controller");

userRouter
  .route("/")
  .post(createUser)
  .all(handle405);

userRouter
  .route("/:usr")
  .get(getUser)
  .all(handle405);

module.exports = userRouter;
