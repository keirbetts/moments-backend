const { postImages } = require("../models/image-model");

const uploadImages = (req, res, next) => {
  console.log("in the controller");
  postImages(req, res, error => {
    if (error) {
      console.log(error, "error");
      res.json({ error });
    } else {
      if (req.file === undefined) {
        console.log("no file selected");
        res.json("no file selecteddddd");
      } else {
        const imageName = req.file.key; // invoking func from model
        const imageLocation = req.file.location;
        console.log(imageLocation, "img location");
        res
          .json({
            img: {
              image: imageName,
              location: imageLocation
            }
          })
          .status(200);
      }
    }
  });
};

module.exports = { uploadImages };
