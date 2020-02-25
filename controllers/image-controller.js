const { postImages, updateDB } = require("../models/image-model");

const uploadImages = (req, res, next) => {
  return new Promise((resolve, reject) => {
    postImages(req, res, error => {
      if (error) {
        reject(error);
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        const { usr } = req.body;

        updateDB(imageName, imageLocation, usr)
          .then(data => {
            res.send({
              image: imageName,
              location: imageLocation,
              status: 200,
              msg: "success DB update"
            });
          })
          .catch(next);

        resolve();
      }
    });
  }).catch(next);
};

module.exports = { uploadImages };
