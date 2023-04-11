const express = require("express");
const { recruitmentController } = require("../controller");
const { recruitmentMiddleware } = require("../middleware");
const { participantsMiddleware } = require("../middleware");
const { authMiddleware } = require("../middleware");
const { participantsController } = require("../controller");

/**
 * @swagger
 * tags:
 *   name: Recruitment
 *   description: 모집글 관리
 */
const recruitmentRouter = express.Router();

/**
 * @swagger
 * /api/v1/recruitment:
 *  post:
 *    summary: "모집글 등록"
 *    tags: [Recruitment]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recruitment'
 *    responses:
 *      201:
 *        description: 생성된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.post(
  "/",
  authMiddleware.verifyLogin,
  recruitmentMiddleware.checkCompleteRecruitmentFrom("body"),
  recruitmentController.createRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  get:
 *    summary: "특정 모집글 조회"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 조회된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.get(
  "/:id",
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.getRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment:
 *  get:
 *    summary: "모든 모집글 조회 (자치구별로 선택 가능)"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: query
 *        name: boroughId
 *        schema:
 *          type: integer
 *        description: 자치구별로 게시글을 조회하려면 boroughId 값을 전달하세요.
 *        example: 1
 *        required: false
 *    responses:
 *      200:
 *        description: 조회된 모든 모집글 목록
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.get("/", recruitmentController.getRecruitments);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  put:
 *    summary: "모집글 수정"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recruitment'
 *    responses:
 *      200:
 *        description: 수정된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.put(
  "/:id",
  authMiddleware.verifyRecuitmentUser("params"),
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentMiddleware.checkMinRecruitmentConditionFrom("body"),
  recruitmentController.putRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  delete:
 *    summary: "모집글 삭제"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 삭제된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.delete(
  "/:id",
  authMiddleware.verifyRecuitmentUser("params"),
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.deleteRecruitment
);

// 참여자 추가
/**
 * @swagger
 * /api/v1/recruitment/{recruitmentId}/participants:
 *  post:
 *    summary: "참여자 추가"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: recruitmentId
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 참여자가 추가된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.post(
  "/:recruitmentId/participants",
  authMiddleware.verifyLogin,
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsController.addParticipant
);

// 모집글 별 참가자 탈퇴
/**
 * @swagger
 * /api/v1/recruitment/{recruitmentId}/participants:
 *  delete:
 *    summary: "참여자 탈퇴"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: recruitmentId
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 참여자가 탈퇴한 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.delete(
  "/:recruitmentId/participants",
  authMiddleware.verifyLogin,
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsController.deleteParticipant
);

// 댓글
/**
 * @swagger
 * /api/v1/recruitment/{recruitmentId}/comment:
 *  post:
 *    summary: "댓글 생성"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: recruitmentId
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      201:
 *        description: 생성된 댓글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */

recruitmentRouter.post(
  "/:recruitmentId/comment",
  authMiddleware.verifyLogin,
  recruitmentMiddleware.checkRecruitment("params"),
  recruitmentController.createComment
);

// 댓글 수정
/**
 * @swagger
 * /api/v1/recruitment/{recruitmentId}/comment/{commentId}:
 *  put:
 *    summary: "댓글 수정"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: recruitmentId
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
 *        required: true
 *        description: 댓글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: 수정된 댓글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */
recruitmentRouter.put(
  "/:recruitmentId/comment/:commentId",
  authMiddleware.verifyCommentUser("params"),
  recruitmentMiddleware.checkRecruitment("params"),
  recruitmentMiddleware.checkCommentFrom("body"),
  recruitmentController.editComment
);
// 댓글 삭제
/**
 * @swagger
 * /api/v1/recruitment/{recruitmentId}/comment/{commentId}:
 *  delete:
 *    summary: "댓글 삭제"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: recruitmentId
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
 *        required: true
 *        description: 댓글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 삭제된 댓글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */
recruitmentRouter.delete(
  "/:recruitmentId/comment/:commentId",
  recruitmentMiddleware.checkCommentIdFrom("params"),
  recruitmentMiddleware.checkRecruitment("params"),
  authMiddleware.verifyCommentUser("params"),
  recruitmentController.deleteComment
);

module.exports = recruitmentRouter;
