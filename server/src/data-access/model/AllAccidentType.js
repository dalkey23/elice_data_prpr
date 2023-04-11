const mongoose = require("mongoose");
const { allAccidentTypeSchema } = require("../schema");

const AllAccidentType = mongoose.model(
  "AllAccidentType",
  allAccidentTypeSchema
);

module.exports = AllAccidentType;
