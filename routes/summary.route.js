const express = require("express");
const multer = require("multer");
const upload = multer();
const summaryController = require("../controllers/summary.controller.js");

const router = express.Router();

router.get("/", summaryController.getSummary);

module.exports = router;
