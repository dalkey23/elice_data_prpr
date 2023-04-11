const mongoose = require("mongoose");
const { commentSchema } = require("../schema");

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
