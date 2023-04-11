const mongoose = require("mongoose");
const { recruitmentSchema } = require("../schema");

const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

module.exports = Recruitment;
