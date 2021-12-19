const express = require('express');
const app = express();

app.use(express.json());

// all routes import here
const products = require("./routes/product");

app.use("/api/v1", products);

module.exports = app;