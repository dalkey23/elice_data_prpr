const express = require("express");
const { boardController } = require("../controller");
const { boardMiddleware, authMiddleware } = require("../middleware");

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 커뮤니티 게시판 관리
 */
const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/board:
 *  post:
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글을 등록한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              author:
 *                type: ObjectId
 *                description: "작성자"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시글 내용"
 *              image:
 *                type: string
 *                description: "게시글 이미지"
 *    responses:
 *      "200":
 *        description: 게시글 작성
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 */
boardRouter.post(
  "/",
  authMiddleware.verifyLogin,
  boardMiddleware.checkCompleteBoardFrom("body"),
  boardController.createBoard
);

/**
 * @swagger
 * /api/v1/board:
 *  get:
 *    summary: "게시글 목록 조회"
 *    description: "게시글 목록을 조회한다"
 *    tags: [Board]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: 현재페이지
 *        schema:
 *          type: string
 *      - in: query
 *        name: perPage
 *        required: false
 *        description: 게시글 수
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}, ...]
 */
boardRouter.get("/", boardController.getBoards);

/**
 * @swagger
 * /api/v1/board/{id}:
 *  get:
 *    summary: "게시글 상세조회"
 *    description: "특정 게시물 내용과 댓글을 조회한다"
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 상세조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 *                comments:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","content": "test content","writer": "t123"}, ...]
 */
boardRouter.get(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  boardController.getBoard
);

/**
 * @swagger
 * /api/v1/board/{id}:
 *  put:
 *    summary: "게시글 수정"
 *    description: "PUT 방식으로 게시글을 수정한다."
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 수정)
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
 *                description: "게시글 내용"
 *              image:
 *                type: string
 *                description: "게시글 이미지"
 *    responses:
 *      "200":
 *        description: 게시글 수정
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 *                comments:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","content": "test content","writer": "t123"}, ...]
 */
boardRouter.put(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  authMiddleware.verifyBoardUser("params"),
  boardMiddleware.checkMinBoardConditionFrom("body"),
  boardController.editBoard
);

/**
 * @swagger
 * /api/v1/board/{id}:
 *  delete:
 *    summary: "게시글 삭제"
 *    description: "DELETE 방식으로 게시글과 댓글을 삭제한다."
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 및 댓글 삭제
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "641a6403861c4b7482a35d78","author": "6417fde6bdbf8824233b7ec2","title": "test123", "content": "게시글을 수정해보자자","image": "imgurl","createdAt": "2023-03-22T02:12:19.969Z","updatedAt": "2023-03-22T02:18:30.206Z","__v": 0},{"acknowledged": true,"deletedCount": 1}]
 */
boardRouter.delete(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  authMiddleware.verifyBoardUser("params"),
  boardController.deleteBoard
);

// 댓글
/**
 * @swagger
 * /api/v1/board/:boardId/comment:
 *  post:
 *    summary: "댓글 등록"
 *    description: "POST 방식으로 댓글을 등록한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (댓글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: "댓글 내용"
 *    responses:
 *      "200":
 *        description: 댓글 작성
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"writer": "6417fde6bdbf8824233b7ec2","content": "안녕하세여여","parentId": "641a43a5787a32395e83f497","category": "board","_id": "641a66dbed19780d0081ff0e","createdAt": "2023-03-22T02:24:27.446Z","updatedAt": "2023-03-22T02:24:27.446Z","__v": 0}]
 */
boardRouter.post(
  "/:boardId/comment",
  authMiddleware.verifyLogin,
  boardMiddleware.checkBoard("params"),
  boardController.createComment
);

/**
 * @swagger
 * /api/v1/board/{boardId}/comment/{commentId}:
 *  put:
 *    summary: "게시글 수정"
 *    description: "PUT 방식으로 게시글을 수정한다."
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: boardId
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
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (댓글 수정)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: "게시글 내용"
 *    responses:
 *      "200":
 *        description: 댓글 수정
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                comments:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","content": "test content","writer": "t123"}]
 */
boardRouter.put(
  "/:boardId/comment/:commentId",
  authMiddleware.verifyCommentUser("params"),
  boardMiddleware.checkBoard("params"),
  boardMiddleware.checkCommentFrom("body"),
  boardController.editComment
);

/**
 * @swagger
 * /api/v1/board/{boardId}/comment/{commentId}:
 *  delete:
 *    summary: "댓글 삭제"
 *    description: "DELETE 방식으로 댓글을 삭제한다."
 *    tags: [Board]
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
boardRouter.delete(
  "/:boardId/comment/:commentId",
  boardMiddleware.checkCommentIdFrom("params"),
  boardMiddleware.checkBoard("params"),
  authMiddleware.verifyCommentUser("params"),
  boardController.deleteComment
);

module.exports = boardRouter;
