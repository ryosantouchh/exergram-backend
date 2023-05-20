const express = require("express");

const activityRoute = require("./activity.route.js");
const authRoute = require("./auth.route.js");
const profileRoute = require("./profile.route.js");
const {
  authentication,
} = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/activity", authentication, activityRoute);
router.use("/profile", authentication, profileRoute);

module.exports = router;
