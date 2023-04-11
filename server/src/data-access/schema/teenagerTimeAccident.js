const mongoose = require("mongoose");

const teenagerTimeAccidentSchema = new mongoose.Schema(
  {
    by_time: {
      type: String,
      required: true,
    },
    death_toll: {
      type: Number,
      required: true,
    },
    number_of_injured: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "TeenagerTimeAccident",
  }
);

module.exports = teenagerTimeAccidentSchema;
