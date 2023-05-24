const quoteModel = require("../models/quote.model.js");

const getAllQuote = async (req, res, next) => {
  try {
    const response = await quoteModel.find({});
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllQuote };
