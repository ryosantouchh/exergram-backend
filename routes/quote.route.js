const express = require("express");
const multer = require("multer");
const upload = multer();
const quoteController = require("../controllers/quote.controller.js");

const router = express.Router();

router.get("/", quoteController.getAllQuote);

module.exports = router;
