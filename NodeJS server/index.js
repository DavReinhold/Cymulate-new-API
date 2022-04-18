const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("./models/dbConnection");
const sources = require("./routes/sources");
const news = require("./routes/news");

// environment variables
require("dotenv").config();
const env = require("./config");

// create database connection
dbConnection.createConnection();

const app = require("express")();

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH ,DELETE, OPTIONS",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/sources", sources);
app.use("/news", news);

app.listen(env.PORT, () => {
  console.log(`Serve is running on port ${env.PORT}`);
});
