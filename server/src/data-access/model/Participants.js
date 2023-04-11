const mongoose = require("mongoose");
const { participantsSchema } = require("../schema");

const Participants = mongoose.model("Participants", participantsSchema);

module.exports = Participants;
