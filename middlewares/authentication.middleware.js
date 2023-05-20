const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(req.headers);
    console.log(authorization);
    if (!authorization)
      res.status(401).send({ statusCode: 401, message: "unauthorization" });

    // verify token using jwt
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = jwt.verify(authorization, privateKey);
    // console.log(payload);

    const userId = payload.userId; // we can using user to check in the DB
    const user = await userService.getUserById(userId);
    // console.log(user);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
