const mongoose = require("mongoose");
const { seoulCarAndPeoCasesSchema } = require("../schema");

const SeoulCarAndPeoCases = mongoose.model(
  "SeoulCarAndPeoCases",
  seoulCarAndPeoCasesSchema
);

module.exports = SeoulCarAndPeoCases;
