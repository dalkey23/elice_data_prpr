const express = require("express");
const passport = require("passport");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: 인증 관리
 */

/**
 * @swagger
 * /api/v1/auth/join:
 *  post:
 *    summary: "회원가입"
 *    description: "새로운 사용자 생성."
 *    tags: [auth]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "사용자 이름"
 *              email:
 *                type: string
 *                description: "사용자 이메일"
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
 *                description: "닉네임"
 *    responses:     
 *      "201":
 *        description: 회원가입한 사용자 정보
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
 *                  example: {"name": "아무개", "id": "userId", "nickname": "닉네임", "email": "email@gmail.com", "address": "address", "phoneNumber": "010-1234-5678", "userType": "user", "profileImage": "profileImageUrl(없을 경우 null)", "createdAt": "2023-03-14T07:28:36.874Z", "updatedAt": "2023-03-14T07:28:36.874Z", "__v": 0} 
 */

// 회원가입
authRouter.post(
  "/join",
  userMiddleware.checkJoinFrom("body"),
  userController.createUser,
);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: "로그인"
 *    description: "사용자 인증"
 *    tags: [auth]
 *    requestBody:
 *      description: 이메일, 비밀번호
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "사용자 이메일"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *    responses:     
 *      "200":
 *        description: 로그인한 사용자 정보
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exapmle: null
 *                data:
 *                  type: object
 *                  example: {"id": "userId", "nickname": "닉네임", "email": "email@gmail.com", "userType": "user", "profileImage": "profileImageUrl(없을 경우 null)"}
 */

// 로그인
authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom("body"),
  authMiddleware.existsToken,
  passport.authenticate("local", { session: false }),
  authController.login
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *    summary: "로그아웃"
 *    description: "인증 해제"
 *    tags: [auth]
 *    responses:     
 *      "200":
 *        description: 로그인한 사용자 정보
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
 *                  example: "로그아웃되었습니다."

 */

// 로그아웃
authRouter.post(
  "/logout", 
  authController.logout
);

/**
 * @swagger
 * /api/v1/auth/{id}:
 *  delete:
 *    summary: "회원 탈퇴"
 *    description: "기존 사용자 정보 삭제."
 *    tags: [auth]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 탈퇴하려는 유저 id
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

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser,
);

module.exports = authRouter;
