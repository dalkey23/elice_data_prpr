const mongoose = require("mongoose");
const { carAndPeoSchema } = require("../schema");

const CarAndPeo = mongoose.model("CarAndPeo", carAndPeoSchema);

module.exports = CarAndPeo;
