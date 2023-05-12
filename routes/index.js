const express = require("express");

const activityRoute = require("./activity.route.js");
const userRoute = require("./user.route.js");
const profileRoute = require("./profile.route.js");

const router = express.Router();

router.use("/user", userRoute);
router.use("/activity", activityRoute);
router.use("/profile", profileRoute);

module.exports = router;
