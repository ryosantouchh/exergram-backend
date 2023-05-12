const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
