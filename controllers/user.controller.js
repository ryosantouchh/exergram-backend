const userModel = require("../models/user.model.js");

const createUser = async (req, res, next) => {
  try {
    const registeredAt = new Date();
    const newUser = { ...req.body, registeredAt };
    await userModel.create(newUser);
    res.status(201).send("create user completed");
  } catch (error) {
    error.statusCode = 400;
    error.message = "username or email are already exist";
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.params.userId.length !== 24)
      res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

    const { userId } = req.params;
    const result = await userModel.findByIdAndDelete(userId);

    if (!result)
      res.status(404).send({ message: "user is not found", statusCode: 404 });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, deleteUser };
