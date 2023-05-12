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

// connect at mongodb atlas
mongoose.connect(
  `mongodb+srv://admin:${PASSWORD}@exergramcluster.n0m9se3.mongodb.net/`
);

module.exports = quoteModel;
