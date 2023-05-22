const userModel = require("../models/user.model.js");

const getUserById = async (userId) => {
  const user = await userModel.findById({ _id: userId });
  if (!user)
    res.status(404).send({ statusCode: 404, message: "User not found" });
  return user;
};

// const getUserByUsername =

module.exports = { getUserById };
