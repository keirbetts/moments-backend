const { updateDB, getAllImages } = require("../models/image-model");

const uploadDBInfo = (req, res, next) => {
  const { imageLocation, usr } = req.body;

  updateDB(imageLocation, usr)
    .then(() => {
      res.status(201).send({
        location: imageLocation,
        msg: "success DB update"
      });
    })
    .catch(next);
};

const fetchAllImages = (req, res, next) => {
  const { usr } = req.params;

  getAllImages(usr)
    .then(
      ({
        data: {
          Item: { picURL }
        }
      }) => {
        res.status(200).send({ images: picURL });
      }
    )
    .catch(next);
};

module.exports = { uploadDBInfo, fetchAllImages };
