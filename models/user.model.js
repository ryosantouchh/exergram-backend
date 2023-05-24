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
  contact_number: { type: String },
  birthday: { type: Date, required: true },
  address: { type: String },
  city: { type: String },
  province_state: { type: String },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  TDEE: { type: Number },
  bio_detail: { type: String },
  image: { public_id: { type: String }, url: { type: String } },
  registeredAt: { type: Date },
  lastUpdatedAt: { type: Date },
});

// create model
const collectionName = "users";
const userModel = mongoose.model(collectionName, userSchema);

module.exports = userModel;
