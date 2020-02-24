const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const s3 = new aws.S3();
s3_bucket = process.env.NODE_ENV === undefined ? "moments-nc" : "nc-photo-bucket";

const postImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3_bucket,
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  })
}).single("image.jpeg");

module.exports = { postImages };
