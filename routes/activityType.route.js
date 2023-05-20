const express = require("express");
// const authController = require("../controllers/auth.controller.js");
// const {
//   authentication,
// } = require("../middlewares/authentication.middleware.js");
const activityTypeController = require("../controllers/activityType.controller.js");

const router = express.Router();

router.get("/", activityTypeController.getAllType);
router.get("/:activity_type", activityTypeController.getOneType);

module.exports = router;
