const mongoose = require("mongoose");
const userModel = require("./user.model.js");

const { Schema } = mongoose;
// define schema
const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: userModel, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  lastUpdatedAt: { type: Date },
  duration: { type: Number, required: true },
  distance: { type: Number },
  image: { type: String },
  note: { type: String },
});

// create model
const collectionName = "activities";
const activityModel = mongoose.model(collectionName, activitySchema);

module.exports = activityModel;
