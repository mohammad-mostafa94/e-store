const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

// all routes import here
const products = require("./routes/product");

app.use("/api/v1", products);

// middleware handle errors
app.use(errorMiddleware);

module.exports = app;