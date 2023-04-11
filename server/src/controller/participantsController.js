const { participantsService } = require("../service");
const util = require("../misc/util");

const participantsController = {
  // 새로운 참가자 추가
  async addParticipant(req, res, next) {
    try {
      const { recruitmentId } = req.params;
      const createdParticipant = await participantsService.addParticipant({
        recruitmentId,
        participantId: req.userId,
      });
      res.status(201).json(util.buildResponse(createdParticipant));
    } catch (error) {
      next(error);
    }
  },

  // 특정 모집글에 대한 참가자 목록 조회
  async getParticipantsByRecruitmentId(req, res, next) {
    try {
      const { recruitmentId } = req.params;
      const participants =
        await participantsService.getParticipantsByRecruitmentId(recruitmentId);
      res.status(200).json(util.buildResponse(participants));
    } catch (error) {
      next(error);
    }
  },

  // 참여한 개시글 조회
  async getParticipantIds(req, res, next) {
    try {
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
      const { participantId, recruitmentId } = req.query;
      const participants =
        await participantsService.getParticipantsByRecruitmentIds({
          participantId,
          recruitmentId,
          page,
          perPage,
        });
      res.status(200).json(util.buildResponse(participants));
    } catch (error) {
      next(error);
    }
  },

  // 모집글 별 참가자 삭제
  async deleteParticipant(req, res, next) {
    try {
      const { recruitmentId } = req.params;
      const participantId = req.userId;
      const deletedParticipant = await participantsService.deleteParticipant(
        recruitmentId,
        participantId
      );
      res.status(200).json(util.buildResponse(deletedParticipant));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = participantsController;
