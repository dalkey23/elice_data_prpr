const mongoose = require("mongoose");

const seoulAccidentCasesSchema = new mongoose.Schema(
  {
    borough: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    number_of_cases: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "SeoulAccidentCases",
  }
);

module.exports = seoulAccidentCasesSchema;
