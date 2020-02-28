const createUserInDB = require("../models/user-model");

const createUser = (req, res, next) => {
  const { usr } = req.body;
  createUserInDB(usr)
    .then(() => {
      res.status(201).send({ msg: `${usr} account created in DB` });
    })
    .catch(next);
};

module.exports = createUser;
