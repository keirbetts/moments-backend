const { postImages } = require("../models/image-model");

const uploadImages = (req, res, next) => {
  return new Promise((resolve, reject) => {
    postImages(req, res, error => {
      if (error) {
        reject(error);
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;

        resolve(
          res.json({
            img: {
              image: imageName,
              location: imageLocation
            }
          })
        );
      }
    });
  }).catch(next);
};

module.exports = { uploadImages };
