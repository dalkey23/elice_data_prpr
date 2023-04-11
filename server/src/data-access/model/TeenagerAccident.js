const mongoose = require("mongoose");
const { teenagerAccidentSchema } = require("../schema");

const TeenagerAccident = mongoose.model(
  "TeenagerAccident",
  teenagerAccidentSchema
);

module.exports = TeenagerAccident;
