const mongoose = require("mongoose");

const seoulTeenagerAccidentSchema = new mongoose.Schema(
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
    casualties: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "SeoulTeenagerAccident",
  }
);

module.exports = seoulTeenagerAccidentSchema;
