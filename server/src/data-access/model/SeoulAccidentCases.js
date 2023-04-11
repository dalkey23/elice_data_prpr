const mongoose = require("mongoose");
const { seoulAccidentCasesSchema } = require("../schema");

const SeoulAccidentCases = mongoose.model(
  "SeoulAccidentCases",
  seoulAccidentCasesSchema
);

module.exports = SeoulAccidentCases;
