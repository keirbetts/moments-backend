const imageRouter = require("express").Router();
const { uploadDBInfo, fetchAllImages } = require("../controllers/image-controller");
const { handle405 } = require("../errors/errors");

imageRouter
  .route("/")
  .post(uploadDBInfo)
  .all(handle405);

imageRouter
  .route("/:usr")
  .get(fetchAllImages)
  .all(handle405);

module.exports = imageRouter;
