const Postservice = require('../services/post.service');
const pstservice = new Postservice();
class PostController {
  creatPostController = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = res.locals;
      const some = req.params;
      console.log('some', some.userId);
      console.log('user', userId);

      if (some.userId != userId) {
        res.status(500).json({ messge: '둥지 주인이 아닙니다.' });
      }
      pstservice.creatPostService({ userId, title, content });
      return res.status(200).json({ messge: '글쓰기 성공' });
    } catch (err) {
      next(err);
    }
  };

  getAllPostController = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const posts = await pstservice.getAllPostService({ userId });

      res.status(200).json({ posts: posts });
    } catch (err) {
      next(err);
    }
  };

  getONEPostController = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;

      const posts = await pstservice.getPostService({ userId, postId });
      res.status(200).json({ post: posts });
    } catch (err) {
      next(err);
    }
  };

  patchOnePostController = async (req, res, next) => {
    try {
      const someId = req.params.userId;
      const postId = req.params.postId;
      const { title, content } = req.body;
      const { userId } = res.locals;

      await pstservice.patchPostService({
        someId,
        userId,
        postId,
        title,
        content,
      });

      res.status(200).json({ messge: '게시글을 수정했습니다.' });
    } catch (err) {
      next(err);
    }
  };

  delOnePostController = async (req, res, next) => {
    try {
      const someId = req.params.userId;
      const postId = req.params.postId;
      const { userId } = res.locals;

      await pstservice.delPostService({ someId, userId, postId });

      res.status(200).json({ messge: '게시글 삭제 성공' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostController;
