const imageRouter = require("express").Router();
const { uploadDBInfo, fetchAllImages } = require("../controllers/image-controller");

imageRouter.route("/").post(uploadDBInfo);

imageRouter.route("/:usr").get(fetchAllImages);

module.exports = imageRouter;
