const { updateDB } = require("../models/image-model");

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

module.exports = { uploadDBInfo };
