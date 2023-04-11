const { Board, Comment, User } = require("./model");
const util = require("../misc/util");

const boardDAO = {
  async createBoard(userId, { title, content, image }) {
    const newBoard = new Board({ author: userId, title, content, image });
    await newBoard.save();
    return newBoard.toObject();
  },

  async findAll(page, perPage) {
    const [total, boards] = await Promise.all([
      Board.countDocuments({}),
      Board.find()
        .populate("author", "nickname")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { boards, total, totalPage };
  },

  async findOne(id) {
    const [board, comments] = await Promise.all([
      Board.findById(id).populate("author", "nickname"),
      Comment.find({ parentId: id, category: "board" }).populate(
        "writer",
        "nickname"
      ),
    ]);
    return { board, comments };
  },

  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      content: toUpdate.content,
      image: toUpdate.image,
    });
    const updatedBaord = await Board.findByIdAndUpdate(id, sanitizedToUpdate);
    return updatedBaord;
  },

  async deleteOne(id) {
    const deleteBoard = await Promise.all([
      Board.findByIdAndDelete(id),
      Comment.deleteMany({ parentId: id }),
    ]);
    return deleteBoard;
  },

  async createComment(userId, { boardId, content }) {
    const newComment = new Comment({
      parentId: boardId,
      writer: userId,
      content,
      category: "board",
    });
    await newComment.save();
    return newComment.toObject();
  },

  async updateComment(boardId, commentId, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      content: toUpdate.content,
    });

    const updateComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      sanitizedToUpdate
    );
    return updateComment;
  },

  async deleteComment(boardId, commentId) {
    const deletedComment = await Comment.findByIdAndDelete({ _id: commentId });
    return deletedComment;
  },

  async getComment(commentId) {
    const comment = await Comment.findById({ _id: commentId });
    return comment;
  },
};

module.exports = boardDAO;
