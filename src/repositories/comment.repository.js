const { Posts, Comments, Users } = require('../models/index');
const { Sequelize } = require('sequelize');
const { ApiError } = require('../utils/apiError');

class CommentRepository {
  cmtPots = async ({ userId, content, postId }) => {
    await Comments.create({ userId, content, postId });
    return true;
  };

  cmtPatch = async ({ commentId, content }) => {
    await Comments.update({ content }, { where: { commentId } });
  };

  cmpairuser = async ({ commentId }) => {
    const aaa = await Comments.findOne({
      where: { commentId },
      attributes: ['userId'],
    });

    return aaa;
  };

  cmtDel = async ({ commentId }) => {
    await Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentRepository;
