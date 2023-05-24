const mongoose = require("mongoose");

const { Schema } = mongoose;
// define schema
const activityTypeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true, unique: true },
  font_awesome_icon: { type: String, required: true },
  METs: { type: Schema.Types.Decimal128 },
});

// create model
const collectionName = "activity_types";
const activityTypeModel = mongoose.model(collectionName, activityTypeSchema);

module.exports = activityTypeModel;
