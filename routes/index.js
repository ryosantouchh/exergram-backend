const express = require("express");

const activityModel = require("../models/activity.model.js");
const activityTypeModel = require("../models/activityType.model.js");
const userModel = require("../models/user.model.js");
const activityTypeRoute = require("./activityType.route.js");
const activityRoute = require("./activity.route.js");
const authRoute = require("./auth.route.js");
const profileRoute = require("./profile.route.js");
const eventRoute = require("./event.route.js");
const quoteRoute = require("./quote.route.js");
const summaryRoute = require("./summary.route.js");
const {
  authentication,
} = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use("/activity_type", activityTypeRoute);
router.use("/auth", authRoute);
router.use("/activity", authentication, activityRoute);
router.use("/profile", authentication, profileRoute);
router.use("/event", authentication, eventRoute);
router.use("/quote", authentication, quoteRoute);
router.use("/summary", authentication, summaryRoute);

module.exports = router;
