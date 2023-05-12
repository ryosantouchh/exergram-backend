const express = require("express");
const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/", userController.createUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
