const mongoose = require("mongoose");
const { ageTimeAccidentSchema } = require("../schema");

const AgeTimeAccident = mongoose.model(
  "AgeTimeAccident",
  ageTimeAccidentSchema
);

module.exports = AgeTimeAccident;
