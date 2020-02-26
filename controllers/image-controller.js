const { updateDB } = require("../models/image-model");

const uploadDBInfo = (req, res, next) => {
  const { imageLocation, usr } = req.body;

  updateDB(imageLocation, usr)
    .then(() => {
      res.send({
        location: imageLocation,
        status: 200,
        msg: "success DB update"
      });
    })
    .catch(next);
};

module.exports = { uploadDBInfo };
