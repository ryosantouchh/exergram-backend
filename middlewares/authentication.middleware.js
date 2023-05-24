const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

const authentication = async (req, res, next) => {
  try {
    // const { authorization } = req.headers;
    // console.log(req.headers);
    // console.log(authorization);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      res.status(401).send({ statusCode: 401, message: "unauthorization" });

    const token = req.headers.authorization.split(" ")[1]; // [Bearer, token]
    // console.log(token);
    // verify token using jwt
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = jwt.verify(token, privateKey);

    // console.log(payload);

    const userId = payload.userId; // we can using user to check in the DB
    const user = await userService.getUserById(userId);
    req.user = user;

    next();
  } catch (error) {
    res.send("from this");
    console.log(error);
    next(error);
  }
};

module.exports = { authentication };
