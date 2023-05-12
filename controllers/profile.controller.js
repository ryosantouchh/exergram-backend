const userModel = require("../models/user.model.js");

const getUserData = async (req, res, next) => {
  try {
    if (req.params.userId.length !== 24)
      res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

    const { userId } = req.params; // mock
    const result = await userModel.findById(userId);

    if (!result)
      res.status(404).send({ message: "user is not found", statusCode: 404 });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  try {
    if (req.params.userId.length !== 24)
      res.status(400).send({ message: "incorrect user_id", statusCode: 400 });

    if (req.body.username)
      res
        .status(400)
        .send({ message: "username cannot change", statusCode: 400 });

    const { userId } = req.params; // mock
    const lastUpdatedAt = new Date();
    const updateData = { ...req.body, lastUpdatedAt };
    const result = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserData, updateUserData };
