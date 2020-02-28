const aws = require("aws-sdk");
aws.config.update({ region: "eu-west-2" });

const ddb = new aws.DynamoDB.DocumentClient();

const createUserInDB = usr => {
  const params = {
    TableName: "Moments-dev",
    Item: {
      usr,
      picURL: []
    }
  };

  return new Promise((resolve, reject) => {
    ddb.put(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data });
      }
    });
  });
};

module.exports = createUserInDB;
