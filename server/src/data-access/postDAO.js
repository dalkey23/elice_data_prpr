const { Post } = require("./model");
const util = require("../misc/util");

const postDAO = {
  async create({ title, content, author }) {
    const board = new Post({ title, content, author });
    await board.save();
    return board.toObject();
  },
  async findOne(id) {
    const plainPost = await Post.findById(id).lean();
    return plainPost;
  },
  async findMany(filter) {
    const sanitizedFilter = util.sanitizeObject({
      title: filter.title,
      author: filter.author,
    });
    const plainPosts = await Post.find(sanitizedFilter).lean();
    return plainPosts;
  },
  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      author: toUpdate.author,
    });
    const plainUpdatedPost = await Post.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true,
        new: true,
      }
    ).lean();
    return plainUpdatedPost;
  },
  async deleteOne(id) {
    const plainDeletedPost = await Post.findByIdAndDelete({ _id: id }).lean();
    return plainDeletedPost;
  },
  async deleteMany(condition) {
    const sanitizedCondition = util.sanitizeObject({
      title: condition.title,
      author: condition.author,
    });
    const plainDeletedPosts = await Post.deleteMany(sanitizedCondition).lean();
    return plainDeletedPosts;
  },
};

module.exports = postDAO;
