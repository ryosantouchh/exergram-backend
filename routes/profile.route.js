const express = require("express");
const profileController = require("../controllers/profile.controller.js");

const router = express.Router();

router.get("/", profileController.getUserData);
router.patch("/", profileController.updateUserData);

module.exports = router;
