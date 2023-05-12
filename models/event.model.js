const mongoose = require("mongoose");

const { Schema } = mongoose;
// define schema
const eventSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
});

// create model
const collectionName = "events";
const eventModel = mongoose.model(collectionName, eventSchema);

// connect at mongodb atlas
mongoose.connect(
  `mongodb+srv://admin:${PASSWORD}@exergramcluster.n0m9se3.mongodb.net/`
);

module.exports = eventModel;
