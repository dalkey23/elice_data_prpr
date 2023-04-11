const { recruitmentService } = require("../service");
const util = require("../misc/util");

const recruitmentController = {
  async createRecruitment(req, res, next) {
    try {
      const {
        borough,
        title,
        volunteerTime,
        recruitments,
        content,
        image,
        address,
        category,
        meetingStatus,
        participants,
      } = req.body;
      const recruitment = await recruitmentService.createRecruitment({
        borough,
        title,
        volunteerTime,
        recruitments,
        content,
        author: req.userId,
        image,
        address,
        category,
        meetingStatus,
        participants,
      });
      res.status(201).json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async getRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const recruitment = await recruitmentService.getRecruitment(id);
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async getRecruitments(req, res, next) {
    try {
      const boroughId = req.query.boroughId;
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
      const {
        title,
        volunteerTime,
        author,
        address,
        category,
        meetingStatus,
        participants,
      } = req.body;
      const { recruitments, total, totalPage } =
        await recruitmentService.getRecruitments(
          {
            borough: boroughId,
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
      res.json(
        util.buildResponse({
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          recruitmentCount: total,
          recruitments,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  async putRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const {
        borough,
        title,
        volunteerTime,
        recruitments,
        content,
        image,
        address,
        category,
        meetingStatus,
        participants,
      } = req.body;
      const recruitment = await recruitmentService.updateRecruitment(id, {
        borough,
        title,
        volunteerTime,
        recruitments,
        content,
        image,
        address,
        category,
        meetingStatus,
        participants,
      });
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async deleteRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const recruitment = await recruitmentService.deleteRecruitment(id);
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },

  async getMyRecruitments(req, res, next) {
    try {
      const userId = req.userId;
      console.log(userId);
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
      const { myRecruitments, total, totalPage } =
        await recruitmentService.getMyRecruitments(userId, page, perPage);
      res.json(
        util.buildResponse({
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          myRecruitmentsCount: total,
          myRecruitments,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  async getMyParticipants(req, res, next) {
    try {
      const participantId = req.userId;
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
      const { myParticipants, total, totalPage } =
        await recruitmentService.getMyParticipants(
          participantId,
          page,
          perPage
        );
      res.json(
        util.buildResponse({
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          myParticipantsCount: total,
          myParticipants,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  //댓글
  async createComment(req, res, next) {
    try {
      const { recruitmentId } = req.params;
      const { content } = req.body;
      const userId = req.userId;

      const comment = await recruitmentService.createComment(userId, {
        recruitmentId,
        content,
      });
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },

  async editComment(req, res, next) {
    try {
      const { recruitmentId, commentId } = req.params;
      const { content } = req.body;
      const updatedComment = await recruitmentService.updateComment(
        recruitmentId,
        commentId,
        { content }
      );
      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const { recruitmentId, commentId } = req.params;
      console.log(commentId);
      const comment = await recruitmentService.deleteComment(
        recruitmentId,
        commentId
      );
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = recruitmentController;
