const imageRouter = require("express").Router();
const { uploadImages } = require("../controllers/image-controller");

imageRouter.route("/").post(uploadImages);

module.exports = imageRouter;
