const express = require("express");
const { userController, recruitmentController } = require("../controller");
const { userMiddleware, authMiddleware } = require("../middleware");

const myRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: my
 *   description: 마이 페이지
 */

/**
 * @swagger
 * /api/v1/my/{id}:
 *  put:
 *    summary: "사용자 정보 수정"
 *    description: "로그인한 사용자 개인정보 수정."
 *    tags: [my]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 수정하려는 사용자 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 수정하고자 하는 사용자 정보(userId, 이메일, userType 제외)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "사용자 이름"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *              address:
 *                type: string
 *                description: "주소"
 *              phoneNumber:
 *                type: string
 *                description: "휴대폰 번호"
 *              nickname:
 *                type: string
 *                description: "작성자"
 *              profileImage:
 *                type: string
 *                description: "프로필 이미지 url"
 *    responses:
 *      "200":
 *        description: 수정된 사용자 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: null
 *                data:
 *                  type: object
 *                  example: {"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}
 */
myRouter.put(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userMiddleware.checkUserInfoFrom("body"),
  userController.updateUser
);

/**
 * @swagger
 * /api/v1/my/authorRecruitments:
 *  get:
 *    summary: "내가 개설한 게시글 조회"
 *    description: "로그인한 사용자가 개설한 게시글을 조회합니다."
 *    tags: [my]
 *    responses:
 *      "200":
 *        description: 사용자가 개설한 게시글 목록
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Recruitment'
 */
myRouter.get(
  "/authorRecruitments",
  authMiddleware.verifyLogin,
  recruitmentController.getMyRecruitments
);

/**
 * @swagger
 * /api/v1/my/participantRecruitments:
 *  get:
 *    summary: "내가 참여한 게시글 조회"
 *    description: "로그인한 사용자가 참여한 게시글을 조회합니다."
 *    tags: [my]
 *    responses:
 *      "200":
 *        description: 사용자가 참여한 게시글 목록
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Recruitment'
 */
myRouter.get(
  "/participantRecruitments",
  authMiddleware.verifyLogin,
  recruitmentController.getMyParticipants
);

/**
 * @swagger
 * /api/v1/my/{id}:
 *  get:
 *    summary: "사용자 정보 조회"
 *    description: "로그인한 사용자 개인정보 조회."
 *    tags: [my]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 조회하려는 사용자 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: null
 *                data:
 *                  type: object
 *                  example: {"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}
 */
myRouter.get(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userController.getUser
);

module.exports = myRouter;
