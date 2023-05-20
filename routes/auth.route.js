const express = require("express");
const multer = require("multer");
const upload = multer();
const authController = require("../controllers/auth.controller.js");
const {
  authentication,
} = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.post("/register", upload.none(), authController.register);
router.post("/login", authController.login);
router.delete("/:userId", authentication, authController.deleteUser);

module.exports = router;
