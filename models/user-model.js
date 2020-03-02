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

const updateActiveUser = usr => {
  const params = {
    TableName: "Moments-dev",
    Key: {
      usr: "Active"
    },
    UpdateExpression: "SET refActive = :vals",
    ExpressionAttributeValues: {
      ":vals": usr
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

const fetchUser = ({ usr }) => {
  const params = {
    TableName: "Moments-dev",
    FilterExpression: "usr = :username",
    ExpressionAttributeValues: { ":username": usr }
  };
  return new Promise((resolve, reject) => {
    ddb.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = { createUserInDB, updateActiveUser, fetchUser };
