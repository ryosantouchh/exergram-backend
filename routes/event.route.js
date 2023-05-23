const express = require("express");
const multer = require("multer");
const upload = multer();
const eventController = require("../controllers/event.controller.js");

const router = express.Router();

router.get("/", eventController.getAllEvent);

module.exports = router;
