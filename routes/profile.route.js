const express = require("express");
const profileController = require("../controllers/profile.controller.js");

const router = express.Router();

router.get("/:userId", profileController.getUserData);
router.patch("/:userId", profileController.updateUserData);

module.exports = router;
