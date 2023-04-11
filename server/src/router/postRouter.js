const express = require("express");
const { postController } = require("../controller");
const { postMiddleware } = require("../middleware");

/**  
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시글 관리
 */
const postRouter = express.Router();

/**
 * @swagger
 * /api/v1/posts:
 *  post:
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글를 등록한다."
 *    tags: [Posts]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 *              author:
 *                type: string
 *                description: "작성자"
 */
postRouter.post(
  "/",
  postMiddleware.checkCompletePostFrom("body"),
  postController.postPost
);

/**
 * @swagger
 * /api/v1/posts/{_id}:
 *  get: 
 *    summary: "특정 게시글조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "post1" }]
 */
postRouter.get(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.getPost
);

/**
 * @swagger
 * /api/v1/post/post?title={title}&author={author}:
 *  get:
 *    summary: "특정 게시글조회 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Posts]
 *    parameters:
 *      - in: query
 *        name: title
 *        required: true
 *        description: 게시글 제목
 *        schema:
 *          type: string
 *      - in: query
 *        name: author
 *        required: true
 *        description: 게시글 작성자
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
postRouter.get("/", postController.getPosts);

/**
 * @swagger
 * /api/v1/posts/update/{_id}:
 *   patch:
 *    summary: "게시글 수정"
 *    description: "Patch 방식을 통해 특정 게시글 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 게시글 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "게시글 이름"
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 수정)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [
 *                      { "id": 1, "name": "post1" },
 *                      { "id": 2, "name": "post2" },
 *                      { "id": 3, "name": "post3" },
 *                    ]
 */
postRouter.put(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkMinPostConditionFrom("body"),
  postController.putPost
);


/**
 * @swagger
 * /api/v1/posts/delete/{_id}:
 *   delete:
 *    summary: "특정 게시글 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (특정 게시글 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "post1" },
 *                      { "id": 2, "name": "post1" },
 *                      { "id": 3, "name": "post1" },
 *                    ]
 */
postRouter.delete(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.deletePost
);

/**
 * @swagger
 * /api/v1/posts:
 *  delete:
 *    summary: "게시글 삭제"
 *    description: "delete 방식으로 게시글를 삭제한다."
 *    tags: [Posts]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 삭제)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 */
postRouter.delete(
  "/",
  postMiddleware.checkMinPostConditionFrom("body"),
  postController.deletePosts
);

module.exports = postRouter;
