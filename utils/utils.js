const s3 = new aws.S3({
  accessKeyId: "",
  secretAccessKey: "",
  Bucket: "moments-nc"
});

exports.multerUpload = {
  storage: multerS3({
    s3: s3,
    bucket: ""
  })
};
