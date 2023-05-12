const mongoose = require("mongoose");

const { Schema } = mongoose;
// define schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ["male", "female", "prefer not to say"],
    required: true,
  },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date },
  lastUpdatedAt: { type: Date },
  location: { type: String },
  height: { type: Number },
  weight: { type: Number },
  bio_detail: { type: String },
});

// create model
const collectionName = "users";
const userModel = mongoose.model(collectionName, userSchema);

module.exports = userModel;
