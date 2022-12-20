const { Posts, Comments, Users } = require('../models/index.js');
const { Sequelize } = require('sequelize');
const { ApiError } = require('../utils/apiError');

class PostsRepository {
  creatpost = async ({ userId, title, content }) => {
    await Posts.create({ userId, title, content });
    return true;
  };

  getAllposts = async ({ userId }) => {
    const posts = await Posts.findAll({
      where: { userId },
      order: [['createdAt', 'asc']],
      attributes: ['postId', 'title', 'updatedAt'],
    });

    return posts;
  };

  getpost = async ({ userId, postId }) => {
    const post = await Posts.findOne({
      where: { postId },
      order: [['createdAt', 'asc']],
      attributes: ['postId', 'title', 'updatedAt'],
      raw: true,
    });

    return post;
  };

  getpostSecond = async ({ postId }) => {
    const postsComments = Comments.findAll({
      where: { postId },
      attributes: [
        'commentId',
        [Sequelize.col('User.nickname'), 'nickname'],
        'content',
      ],

      include: [
        {
          model: Users,
          as: 'User',
          required: true,

          attributes: [],
        },
      ],
      raw: true,
    });

    return postsComments;
  };

  patchpost = async ({ postId, title, content }) => {
    await Posts.update({ title, content }, { where: { postId: postId } });

    return true;
  };

  dlepost = async ({ postId }) => {
    await Posts.destroy({ where: { postId } });

    return true;
  };
}

module.exports = PostsRepository;
