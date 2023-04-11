const { boardDAO } = require("../data-access");

const boardService = {
  async createBoard(userId, { title, content, image }) {
    const createBoard = await boardDAO.createBoard(userId, {
      title,
      content,
      image,
    });
    return createBoard;
  },

  async getBoardAll(page, perPage) {
    const boardAll = await boardDAO.findAll(page, perPage);
    return boardAll;
  },

  async getBoard(id) {
    const board = await boardDAO.findOne(id);
    return board;
  },

  async updateBoard(id, { title, content, image }) {
    const updateBoard = await boardDAO.updateOne(id, { title, content, image });
    return updateBoard;
  },

  async deleteBoard(id) {
    const deleteBoard = await boardDAO.deleteOne(id);
    return deleteBoard;
  },

  async createComment(userId, { boardId, content }) {
    const comment = await boardDAO.createComment(userId, {
      boardId,
      content,
    });
    return comment;
  },
  async updateComment(boardId, commentId, { content }) {
    const updateComment = await boardDAO.updateComment(boardId, commentId, {
      content,
    });
    return updateComment;
  },

  async deleteComment(boardId, commentId) {
    const deletedComment = await boardDAO.deleteComment(boardId, commentId);
    return deletedComment;
  },

  async getComment(commentId) {
    const comment = await boardDAO.getComment(commentId);
    return comment;
  },
};

module.exports = boardService;
