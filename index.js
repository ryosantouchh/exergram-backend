const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./mongodb/connection.js");
const cloudinary = require("cloudinary");

const apiRoute = require("./routes/index.js");
dotenv.config();
// require('dotenv').config()

const app = express();

const HOST = process.env.SERVER || "localhost";
const PORT = process.env.PORT || 8080;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

// #1 : CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// #2 : parse JSON to object
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", apiRoute);

app.use("/", (error, req, res, next) => {
  // console.log(error);
  const errorObj = { message: error.message, statusCode: 500 };
  if (error.statusCode) errorObj.statusCode = error.statusCode;
  res.status(errorObj.statusCode).send(errorObj);
});

// #3 : start server
const start = async () => {
  await mongodb.connect();
  app.listen(PORT, () => {
    console.log("server is running at port : " + PORT);
  });
};

start();
