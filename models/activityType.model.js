const mongoose = require("mongoose");

const { Schema } = mongoose;
// define schema
const activityTypeSchema = new Schema({
  type: { type: String, required: true, unique: true },
  font_awesome_icon: { type: String, required: true },
});

// create model
const collectionName = "activity_types";
const activityTypeModel = mongoose.model(collectionName, activityTypeSchema);

module.exports = activityTypeModel;
