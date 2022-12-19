const { Posts, Comments, Users } = require('../models/index.js');
const { Sequelize } = require('sequelize');

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
    console.log(3);
    const post = await Posts.findAll({
      where: { userId },
      order: [['createdAt', 'asc']],
      attributes: ['postId', 'title', 'updatedAt'],

      include: [
        {
          subQuery: false,
          model: Comments,
          as: 'Comments',
          where: { postId },
          order: [['createdAt', 'asc']],

          attributes: [
            'commentId',
            //[Sequelize.col('User.nickname'), 'nickname'],
            'content',
          ],

          include: [
            {
              model: Users,
              as: 'User',
              required: true,

              attributes: ['nickname'],
            },
          ],
        },
      ],
    });
    console.log(post);
    return post;
  };

  patchpost = async ({ someId, postId, title, content }) => {
    console.log('someId', someId);
    console.log('postId', postId);
    console.log('title', title);
    console.log('content', content);

    //await Posts.update({ title, content }, { where: { postId: postId } });

    return res.status(200).json({ messge: '게시글을 수정했습니다.' });
  };

  dlepost = async ({ postId }) => {
    await Posts.destroy({ where: { postId } });

    res.statsu(200).json({ messge: '게시글을 삭제했습니다.' });
  };
}

module.exports = PostsRepository;
