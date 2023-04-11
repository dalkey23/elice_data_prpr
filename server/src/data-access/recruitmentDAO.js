const { Recruitment, Comment, Participants } = require("./model");
const util = require("../misc/util");

const recruitmentDAO = {
  // 새로운 모집글 생성
  async create({
    borough,
    title,
    volunteerTime,
    recruitments,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participants,
  }) {
    const recruitment = new Recruitment({
      borough,
      title,
      volunteerTime,
      recruitments,
      content,
      author,
      image,
      address,
      category,
      meetingStatus,
      participants,
    });
    // MongoDB에 저장
    await recruitment.save();

    return recruitment.toObject();
  },

  async isRecruitmentClosed(recruitmentId) {
    const recruitment = await Recruitment.findById(recruitmentId).populate(
      "participants"
    );
    const isMeetingStatusClosed = recruitment.meetingStatus === "모집완료";
    const isParticipantsFull =
      recruitment.participants.length >= recruitment.recruitments;

    return isMeetingStatusClosed || isParticipantsFull;
  },

  // 작성자 조회
  async findAuthor(filter) {
    const sanitizedFilter = util.sanitizeObject({
      _id: filter.recruitmentId,
      author: filter.participantId,
    });
    console.log(sanitizedFilter);
    const plainRecruitment = await Recruitment.findOne(sanitizedFilter).lean();
    console.log(sanitizedFilter);
    return plainRecruitment;
  },

  // ID를 사용하여 모집글을 검색
  async findOne(id) {
    const [plainRecruitment, comments] = await Promise.all([
      Recruitment.findById(id)
        .populate("borough")
        .populate("author")
        .populate({
          path: "participants",
          populate: { path: "participantId", select: "nickname" },
        })
        .lean(),
      Comment.find({ parentId: id, category: "recruitment" })
        .populate("writer", "nickname")
        .lean(),
    ]);

    return { plainRecruitment, comments };
  },

  // 필터를 사용하여 모집글을 검색
  async findMany(filter, page, perPage) {
    const sanitizedFilter = util.sanitizeObject({
      borough: filter.borough,
      title: filter.title,
      author: filter.author,
      address: filter.address,
      category: filter.category,
      meetingStatus: filter.meetingStatus,
      participants: filter.participants,
    });
    const [total, recruitments] = await Promise.all([
      Recruitment.countDocuments(sanitizedFilter),
      Recruitment.find(sanitizedFilter)
        .populate("borough")
        .populate("author")
        .populate("participants")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { recruitments, total, totalPage };
  },

  // ID를 사용하여 모집글 정보를 업데이트
  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      borough: toUpdate.borough,
      title: toUpdate.title,
      comment: toUpdate.comment,
      volunteerTime: toUpdate.volunteerTime,
      recruitments: toUpdate.recruitments,
      content: toUpdate.content,
      image: toUpdate.image,
      address: toUpdate.address,
      category: toUpdate.category,
      meetingStatus: toUpdate.meetingStatus,
      participants: toUpdate.participants,
    });

    const plainUpdatedRecruitment = await Recruitment.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true,
        new: true,
      }
    )
      .populate("borough")
      .populate("author")
      .populate("participants")
      .lean();

    return plainUpdatedRecruitment;
  },

  // ID를 사용하여 회의를 삭제
  async deleteOne(id) {
    const plainDeletedRecruitment = await Promise.all([
      Recruitment.findByIdAndDelete(id).lean(),
      Participants.deleteMany({ recruitmentId: id }),
      Comment.deleteMany({ parentId: id }),
    ]);
    return plainDeletedRecruitment;
  },

  async myRecruitmentsFind(userId, page, perPage) {
    const filter = { author: userId };
    const [total, myRecruitments] = await Promise.all([
      Recruitment.countDocuments(filter),
      Recruitment.find(filter)
        .populate("borough")
        .populate("author")
        .populate("participants")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { myRecruitments, total, totalPage };
  },

  async myParticipantsFind(participantId, page, perPage) {
    const [total, myParticipants] = await Promise.all([
      Participants.countDocuments({ participantId: participantId }),
      Participants.find({ participantId: participantId })
        .populate({
          path: "recruitmentId",
          populate: { path: "author", select: "nickname" },
        })
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { myParticipants, total, totalPage };
  },

  //댓글
  async createComment(userId, { recruitmentId, content }) {
    const newComment = new Comment({
      parentId: recruitmentId,
      writer: userId,
      content,
      category: "recruitment",
    });
    await newComment.save();
    return newComment.toObject();
  },

  async updateComment(recruitmentId, commentId, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      content: toUpdate.content,
    });

    const updateComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      sanitizedToUpdate
    );
    return updateComment;
  },

  async deleteComment(recruitmentId, commentId) {
    const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });
    return deletedComment;
  },
};

module.exports = recruitmentDAO;
