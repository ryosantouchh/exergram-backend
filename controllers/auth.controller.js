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

    // const calculateAgeFromBirthdate = (birthdate) => {
    //   const birthdateMillisec = birthdate.getTime();
    //   const currentTime = Date.now();
    //   const ageMillisec = currentTime - birthdateMillisec;
    //   const age = Math.floor(ageMillisec / 31557600000);
    //   // 31557600000 is millisecond in one year
    //   return age;
    // };

    // const calculateBMR = (weight, height, birthdate, gender) => {
    //   const age = calculateAgeFromBirthdate(birthdate);

    //   let bmr = null;

    //   // req.body.gender
    //   if (gender === "male") {
    //     bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    //   }

    //   if (gender === "female") {
    //     bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    //   }

    //   if (gender === "prefer not to say") {
    //     bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    //   }

    //   return Math.floor(bmr);
    // };

    const BMR = activityUtil.calculateBMR(
      req.body.weight,
      req.body.height,
      req.body.birthday,
      req.body.gender
    );

    newUser.BMR = BMR;

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

    res
      .status(200)
      .send({
        username,
        firstname: foundedUserData.firstname,
        lastname: foundedUserData.lastname,
        token,
        message: "login success",
      });
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
