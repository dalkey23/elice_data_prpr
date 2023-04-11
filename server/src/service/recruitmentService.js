const { recruitmentDAO } = require("../data-access");

const recruitmentService = {
  //생성
  async createRecruitment({
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
    const createdRecruitment = await recruitmentDAO.create({
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
    return createdRecruitment;
  },

  // id값으로 모집글 하나 찾기
  async getRecruitment(id) {
    const recruitment = await recruitmentDAO.findOne(id);
    return recruitment;
  },

  //모집글들 찾기
  async getRecruitments(
    {
      borough,
      title,
      volunteerTime,
      author,
      address,
      category,
      meetingStatus,
      participants,
    },
    page,
    perPage
  ) {
    const recruitments = await recruitmentDAO.findMany(
      {
        borough,
        title,
        volunteerTime,
        author,
        address,
        category,
        meetingStatus,
        participants,
      },
      page,
      perPage
    );
    return recruitments;
  },

  async updateRecruitment(
    id,
    {
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
    }
  ) {
    const updatedRecruitment = await recruitmentDAO.updateOne(id, {
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
    return updatedRecruitment;
  },

  async deleteRecruitment(id) {
    const deletedRecruitment = await recruitmentDAO.deleteOne(id);
    return deletedRecruitment;
  },

  async getMyRecruitments(userId, page, perPage) {
    const myRecruitments = await recruitmentDAO.myRecruitmentsFind(
      userId,
      page,
      perPage
    );
    return myRecruitments;
  },

  async getMyParticipants(participantId, page, perPage) {
    const myParticipants = await recruitmentDAO.myParticipantsFind(
      participantId,
      page,
      perPage
    );
    return myParticipants;
  },

  //댓글
  async createComment(userId, { recruitmentId, content }) {
    const comment = await recruitmentDAO.createComment(userId, {
      recruitmentId,
      content,
    });
    return comment;
  },
  async updateComment(recruitmentId, commentId, { content }) {
    const updateComment = await recruitmentDAO.updateComment(
      recruitmentId,
      commentId,
      {
        content,
      }
    );
    return updateComment;
  },

  async deleteComment(recruitmentId, commentId) {
    const deletedComment = await recruitmentDAO.deleteComment(
      recruitmentId,
      commentId
    );
    return deletedComment;
  },
};

module.exports = recruitmentService;
