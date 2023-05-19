const express = require("express");
const multer = require('multer');
const upload = multer();
const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/", upload.none(), userController.createUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
