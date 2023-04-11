const { Schema, mongoose } = require("mongoose");

const recruitmentSchema = new mongoose.Schema(
  {
    // 자치구별
    borough: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Borough",
    },
    // 제목
    title: {
      type: String,
      required: true,
    },
    // 봉사 시간
    volunteerTime: {
      type: String,
      required: true,
    },
    // 총 모집인원
    recruitments: {
      type: Number,
      required: true,
    },
    // 글의 코멘트
    content: {
      type: String,
      required: true,
    },
    // 글 작성자
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 이미지
    image: {
      type: String,
      required: false,
    },
    // 주소
    address: {
      type: String,
      required: true,
    },
    // 장기와 단기
    category: {
      type: String,
      required: true,
    },
    // 참가자명단
    participants: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        default: [],
        ref: "Participants",
      },
    ],
    // 모집중, 모집완료
    meetingStatus: {
      type: String,
      enum: ["모집중", "모집완료"],
      required: false,
      default: "모집중",
    },
  },
  {
    collection: "Recruitment",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = recruitmentSchema;
