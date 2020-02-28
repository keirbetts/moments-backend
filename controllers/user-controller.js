const createUserInDB = require("../models/user-model");

const createUser = (req, res, next) => {
  console.log("in controller");
  const { usr } = req.body;
  createUserInDB(usr).then(() => {
    res.status(201).send({ [usr]: `${usr} account created in DB` });
  });
};

module.exports = createUser;
