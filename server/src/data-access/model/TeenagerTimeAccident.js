const mongoose = require("mongoose");
const { teenagerTimeAccidentSchema } = require("../schema");

const TeenagerTimeAccident = mongoose.model(
  "TeenagerTimeAccident",
  teenagerTimeAccidentSchema
);

module.exports = TeenagerTimeAccident;
