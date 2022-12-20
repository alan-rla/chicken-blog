const { Posts, Comments } = require('../models/index');
const { Sequelize } = require('sequelize');
const { ApiError } = require('../utils/apiError');

class CommentRepository {
  cmtPots = async ({ userId, content, postId }) => {
    await Comments.create({ userId, content, postId });
    return true;
  };
}

module.exports = CommentRepository;
