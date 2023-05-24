const express = require("express");
const multer = require("multer");
const upload = multer();
const profileController = require("../controllers/profile.controller.js");

const router = express.Router();

router.get("/", profileController.getUserData);
router.patch("/", upload.single("image"), profileController.updateUserData);

module.exports = router;
