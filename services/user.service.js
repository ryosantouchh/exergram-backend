const userModel = require("../models/user.model.js");

const getUserById = async (userId) => {
  const user = await userModel.findById({ _id: userId });
  return user;
};

module.exports = { getUserById };
