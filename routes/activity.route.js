const express = require("express");
const multer = require("multer");
const upload = multer();
const activityController = require("../controllers/activity.controller.js");
const activityMiddleware = require("../middlewares/activity.middleware.js");

const router = express.Router();

router.get("/", activityController.getAllActivity); // get all activities by user , need auth
router.post("/", upload.single("image"), activityController.createActivity);

router.use("/:activityId", activityMiddleware.activityLengthCheck);
router.get("/:activityId", activityController.getActivityById); // get one activity by _id , need auth
router.patch("/:activityId", activityController.updateActivityById);
router.delete("/:activityId", activityController.deleteActivityById);

module.exports = router;
