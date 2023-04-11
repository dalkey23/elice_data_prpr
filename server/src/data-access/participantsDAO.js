const { Participants, Recruitment } = require("./model");
const util = require("../misc/util");

// mongoose 모듈에서 생성된 RecruitmentParticipaint 스키마를 사용하여 CRUD 작업을 수행하는 participationDAO 객체
const participationDAO = {
  // 새로운 참가자 추가
  async create({ recruitmentId, participantId }) {
    const participants = new Participants({
      recruitmentId,
      participantId,
    });
    await Recruitment.updateOne(
      { _id: recruitmentId },
      {
        $push: { participants: participants._id },
      }
    );

    await participants.save();
    return participants.toObject();
  },

  // 참가자 목록 조회
  async findParticipantsByRecruitmentId(recruitmentId) {
    const participants = await Participants.find({ recruitmentId })
      .populate("participantId")
      .lean();
    return participants;
  },

  // 단일 참가자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      recruitmentId: filter.recruitmentId,
      participantId: filter.participantId,
    });
    const plainParticipants = await Participants.findOne(
      sanitizedFilter
    ).lean();
    return plainParticipants;
  },

  // 참가/개설한 게시글 목록
  async findMany(filter, page, perPage) {
    const sanitizedFilter = util.sanitizeObject({
      recruitmentId: filter.recruitmentId,
      participantId: filter.participantId,
    });
    const [total, participants] = await Promise.all([
      Participants.countDocuments({}),
      Participants.find(sanitizedFilter)
        .populate("participantId")
        .populate("recruitmentId")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { participants, total, totalPage };
  },

  // 모집글 별 참가자 삭제
  async deleteParticipant(recruitmentId, participantId) {
    const deletedParticipant = await Participants.findOneAndDelete({
      recruitmentId,
      participantId,
    }).lean();
    await Recruitment.updateOne(
      { _id: recruitmentId },
      {
        $pull: { participants: deletedParticipant._id },
      }
    );
    return deletedParticipant;
  },
};

module.exports = participationDAO;
