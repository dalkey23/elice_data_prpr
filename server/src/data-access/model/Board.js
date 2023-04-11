const mongoose = require("mongoose");
const { boardSchema } = require("../schema");

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
