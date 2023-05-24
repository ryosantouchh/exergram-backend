const mongoose = require("mongoose");

const { Schema } = mongoose;
// define schema
const quoteSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

// create model
const collectionName = "quotes";
const quoteModel = mongoose.model(collectionName, quoteSchema);

module.exports = quoteModel;
