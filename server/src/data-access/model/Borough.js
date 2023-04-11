const mongoose = require("mongoose");
const { boroughSchema } = require("../schema");

const Borough = mongoose.model("Borough", boroughSchema);

module.exports = Borough;
