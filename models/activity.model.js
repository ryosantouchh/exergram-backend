const mongoose = require("mongoose");
const userModel = require("./user.model.js");

const { Schema } = mongoose;
// define schema
const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: userModel, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  activityDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories_burn: { type: Schema.Types.Decimal128 },
  image: { public_id: { type: String }, url: { type: String } },
  note: { type: String },
  createdAt: { type: Date, required: true },
  lastUpdatedAt: { type: Date },
});

// create model
const collectionName = "activities";
const activityModel = mongoose.model(collectionName, activitySchema);

module.exports = activityModel;
