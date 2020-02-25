const aws = require("aws-sdk");
aws.config.update({ region: "eu-west-2" });
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const s3 = new aws.S3();
const ddb = new aws.DynamoDB.DocumentClient();
const { checkFileType } = require("../utils/utils");
let s3_bucket = "";

if (process.env.NODE_ENV === undefined) {
  s3_bucket = "moments-nc";
} else if (process.env.NODE_ENV === "test") {
  s3_bucket = "nc-photo-bucket";
} else if (process.env.NODE_ENV === "testBadBucket") {
  s3_bucket = "nc-photo-bucke";
}

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
  }),
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image.jpeg");

const updateDb = (imageName, imageLocation) => {
  const params = {
    TableName: "Moments-dev",
    Key: {
      usr: "crookydan",
      picURL: imageLocation
    },
    UpdateExpression: "SET photos = list_append(photos, :vals)",
    ExpressionAttributeValues: {
      ":vals": [imageLocation]
    },
    ReturnValues: "UPDATED_NEW"
  };

  return new Promise((resolve, reject) => {
    ddb.update(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data });
      }
    });
  });
};
module.exports = { postImages };
