const mongoose = require("mongoose");
const { seoulTeenagerAccidentSchema } = require("../schema");

const SeoulTeenagerAccident = mongoose.model(
  "SeoulTeenagerAccident",
  seoulTeenagerAccidentSchema
);

module.exports = SeoulTeenagerAccident;
