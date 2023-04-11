const mongoose = require("mongoose");

const teenagerAccidentSchema = new mongoose.Schema(
  {
    death_toll: {
      type: Number,
      required: true,
    },
    accident_death: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "TeenagerAccident",
  }
);

module.exports = teenagerAccidentSchema;
