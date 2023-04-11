const express = require("express");
const { adminController, recruitmentController, boardController } = require("../controller");
const { authMiddleware, userMiddleware, recruitmentMiddleware, boardMiddleware } = require("../middleware");

const adminRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 관리자 페이지
 */


/**
 * @swagger
 * /api/v1/admin/users:
 *  get:
 *    summary: "회원 목록 조회"
 *    description: "회원 가입한 사용자 목록 조회"
 *    tags: [Admin]
 *    responses:     
 *      "200":
 *        description: 회원 정보 목록
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: null
 *                data:
 *                  type: array
 *                  example: [{"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}, {"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0},]               
 */

// 회원 목록 조회
adminRouter.get(
  "/users",
  authMiddleware.verifyAdmin,
  adminController.getUserslist
);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *  put:
 *    summary: "회원 정보 수정"
 *    description: "회원의 userType 변경 가능(관리자 권한 부여)"
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 수정하려는 사용자 아이디
 *        schema: 
 *          type: string
 *    responses:     
 *      "200":
 *        description: 수정한 회원 정보
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

// 회원 정보 수정
adminRouter.put(
  "/users/:id",
  authMiddleware.verifyAdmin,
  userMiddleware.checkUserIdFrom("params"),
  adminController.updateUser
);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *  delete:
 *    summary: "회원 탈퇴"
 *    description: "기존 사용자 정보 삭제."
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 탈퇴시키려는 유저 id
 *        schema:
 *          type: string
 *    responses:     
 *      "200":
 *        description: 회원 탈퇴 완료
 *        content: 
 *          application/json:
 *            schema:
 *                  type: string
 *                  example: "{nickname}님의 탈퇴가 완료되었습니다."
 */

// 회원 탈퇴
adminRouter.delete(
  "/users/:id",
  authMiddleware.verifyAdmin,
  userMiddleware.checkUserIdFrom("params"),
  adminController.deleteUser
);

/**
 * @swagger
 * /api/v1/admin/recruitment/{id}:
 *  delete:
 *    summary: "모집글 삭제"
 *    description: "관리자 권한으로 모집글 삭제"
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 삭제시키려는 모집글 id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 삭제한 모집글 정보
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
 *                  example: {"_id": "recruitmentId", "borough": "boroughId", "title": "test123","content": "test content", "volunteerTime": "봉사 일시", "rectuitments": 5, "author": "t123", "address": "address", "category": "모집 중", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z"}
 */

// 모집글 삭제
adminRouter.delete(
  "/recruitment/:id",
  authMiddleware.verifyAdmin,
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.deleteRecruitment
)

/**
 * @swagger
 * /api/v1/admin/board/{id}:
 *  delete:
 *    summary: "커뮤니티 글 삭제"
 *    description: "관리자 권한으로 커뮤니티 글 삭제"
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 삭제시키려는 커뮤니티 글 id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 삭제시킨 커뮤니티 글 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url",  "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}
 */

// 게시글 삭제
adminRouter.delete(
  "/board/:id",
  authMiddleware.verifyAdmin,
  boardMiddleware.checkBoardIdFrom("params"),
  boardController.deleteBoard
)

/**
 * @swagger
 * /api/v1/admin/recruitment/{recruitmentId}/comment/{commentId}:
 *  delete:
 *    summary: "모집글 댓글 삭제"
 *    description: "관리자 권한으로 모집글 댓글 삭제"
 *    tags: [Admin]
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

// 모집글 댓글 삭제
adminRouter.delete(
  "/recruitment/:recruitmentId/comment/:commentId",
  authMiddleware.verifyAdmin,
  recruitmentController.deleteComment
)

/**
 * @swagger
 * /api/v1/admin/board/{boardId}/comment/{commentId}:
 *  delete:
 *    summary: "커뮤니티 댓글 삭제"
 *    description: "관리자 권한으로 커뮤니티 댓글 삭제"
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
 *        required: true
 *        description: 댓글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 댓글 삭제
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "641a84a00cb38132ac73be45","writer": "6417fde6bdbf8824233b7ec2","content": "안녕하세여여","parentId": "641a43a5787a32395e83f497","category": "board","createdAt": "2023-03-22T04:31:28.044Z","updatedAt": "2023-03-22T04:31:28.044Z","__v": 0}]
 */

// 게시글 댓글 삭제
adminRouter.delete(
  "/board/:boardId/comment/:commentId",
  authMiddleware.verifyAdmin,
  boardController.deleteComment
)

module.exports = adminRouter;