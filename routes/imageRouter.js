const imageRouter = require("express").Router();
const { uploadDBInfo } = require("../controllers/image-controller");

imageRouter.route("/").post(uploadDBInfo);

module.exports = imageRouter;
