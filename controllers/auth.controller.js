const userModel = require("../models/user.model.js");
const tokenUtil = require("../utils/token.util.js");
const activityUtil = require("../utils/activity.util.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

const register = async (req, res, next) => {
  try {
    // const registeredAt = activityUtil.generateDateGMT7();
    const registeredAt = new Date();

    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      +process.env.SALT_ROUND
    );
    const newUser = { ...req.body, registeredAt, password: hashedPassword };
    // console.log(req.body);
    // console.log(newUser);
    await userModel.create(newUser);
    res.status(201).send("create user completed");
  } catch (error) {
    // error.statusCode = 400;
    // error.message = "username or email are already exist";
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. validate
    if (!username || !password)
      res.status(400).send({
        statusCode: 400,
        message: "Username or password are required",
      });

    const foundedUserData = await userModel.findOne({ username });

    if (!foundedUserData)
      res
        .status(404)
        .send({ statusCode: 404, message: "Username or password are wrong" });

    const hashedPassword = foundedUserData.password;
    // console.log(hashedPassword);
    const checkPassword = bcrypt.compareSync(password, hashedPassword);

    if (!checkPassword)
      res
        .status(400)
        .send({ statusCode: 400, message: "incorrect username or password" });

    // generate token
    const payload = {
      userId: foundedUserData._id,
      firstname: foundedUserData.firstname,
      lastname: foundedUserData.lastname,
    };
    const token = tokenUtil.generateToken(payload);

    res.status(200).send({ username, token, message: "login success" });
  } catch (error) {
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

module.exports = { register, login, deleteUser };
