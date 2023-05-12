const express = require("express");
const activityController = require("../controllers/activity.controller.js");
const activityUtil = require("../utils/activity.util.js");

const router = express.Router();

router.get("/", activityController.getAllActivity); // get all activities by user , need auth
router.post("/", activityController.createActivity);
router.get("/count", activityController.countActivity);

router.use("/:activityId", activityUtil.activityLengthCheck);
router.get("/:activityId", activityController.getActivityById); // get one activity by _id , need auth
router.patch("/:activityId", activityController.updateActivityById);
router.delete("/:activityId", activityController.deleteActivityById);

module.exports = router;
