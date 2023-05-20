const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(req.headers);
    // console.log(authorization);
    if (!authorization || !authorization.startsWith("Bearer"))
      res.status(401).send({ statusCode: 401, message: "unauthorization" });

    const token = authorization.split(" ")[1]; // [Bearer, token]
    // verify token using jwt
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = jwt.verify(token, privateKey);
    // console.log(payload);

    const userId = payload.userId; // we can using user to check in the DB
    const user = await userService.getUserById(userId);
    delete user.password;
    // console.log(user);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
