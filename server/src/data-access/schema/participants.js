const { Schema, mongoose } = require("mongoose");

const participantsSchema = new mongoose.Schema(
  {
    // 모집글 objectId
    recruitmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Recruitment",
    },
    // 참여자 objectId
    participantId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    collection: "Participants",
  }
);

module.exports = participantsSchema;
