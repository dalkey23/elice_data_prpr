const { boardService } = require("../service");

const boardController = {
  async createBoard(req, res, next) {
    try {
      const userId = req.userId;
      const { title, content, image } = req.body;
      const newBoard = await boardService.createBoard(userId, {
        title,
        content,
        image,
      });
      res.status(201).json(newBoard);
    } catch (error) {
      next(error);
    }
  },

  async getBoards(req, res, next) {
    try {
      //page:현재페이지, perPage:페이지 당 게시글 수
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 5);
      const { boards, total, totalPage } = await boardService.getBoardAll(
        page,
        perPage
      );
      res.json({ boards, page, perPage, total, totalPage });
    } catch (error) {
      next(error);
    }
  },

  async getBoard(req, res, next) {
    try {
      const { id } = req.params;
      const board = await boardService.getBoard(id);
      res.json(board);
    } catch (error) {
      next(error);
    }
  },

  async editBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, image } = req.body;
      const updatedBoard = await boardService.updateBoard(id, {
        title,
        content,
        image,
      });
      res.json(updatedBoard);
    } catch (error) {
      next(error);
    }
  },

  async deleteBoard(req, res, next) {
    try {
      const { id } = req.params;
      const board = await boardService.deleteBoard(id);
      res.json(board);
    } catch (error) {
      next(error);
    }
  },

  async createComment(req, res, next) {
    try {
      const { boardId } = req.params;
      const { content } = req.body;
      const userId = req.userId;

      const comment = await boardService.createComment(userId, {
        boardId,
        content,
      });
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },

  async editComment(req, res, next) {
    try {
      const { boardId, commentId } = req.params;
      const { content } = req.body;
      const updatedComment = await boardService.updateComment(
        boardId,
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
      const { boardId, commentId } = req.params;
      console.log(commentId);
      const comment = await boardService.deleteComment(boardId, commentId);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = boardController;
