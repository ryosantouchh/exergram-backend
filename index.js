const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./mongodb/connection.js");

const apiRoute = require("./routes/index.js");
dotenv.config();
// require('dotenv').config()

const app = express();

const HOST = process.env.SERVER || "localhost";
const PORT = process.env.PORT || 8080;

// #1 : CORS
app.use(cors());

// #2 : parse JSON to object
app.use(bodyParser.json());

app.use("/", apiRoute);

app.use("/", (error, req, res, next) => {
  const errorObj = { message: error.message, statusCode: 500 };
  if (error.statusCode) errorObj.statusCode = error.statusCode;
  res.status(errorObj.statusCode).send(errorObj);
});

// #3 : start server
const start = async () => {
  await mongodb.connect();
  app.listen(PORT, HOST, () => {
    console.log("server is running at port : " + PORT);
  });
};

start();
