const { Posts, Comments } = require('../models/index.js');

class PostsRepository {
  creatpost = async ({ userId, title, content }) => {

    await Posts.create({ userId, title, content });
    return true;
  };

  

  getAllposts = async ({userId}) => {
    const posts = await Posts.findAll({
      where: { userId },
      order: [['createdAt', 'desc']],
      attributes: ['postId', 'title', 'updatedAt'],
    });
    
    return posts;
  };
  
  getpost = async ({userId, postId}) => {
    const post = await Posts.findAll({
      where: { userId },
      attributes: ['postId', 'title', 'updatedAt'],
      include: [
        {
          model: Comments,
          as: Comments,
          attributes: ['commentId', 'content'],
        },
        { where: { postId } },
        { order: [['createdAt', 'desc']] },
      ],
    });

    return res.status(200).json({ post });
  };

  patchpost = async (postId, title, content) => {
    await Posts.update({ title, content }, { where: { postId: postId } });

    return res.status(200).json({ messge: '게시글을 수정했습니다.' });
  };

  dlepost = async ({postId}) => {
    await Posts.destroy({ where: { postId } });

    res.statsu(200).json({ messge: '게시글을 삭제했습니다.' });
  };
}

module.exports = PostsRepository;
