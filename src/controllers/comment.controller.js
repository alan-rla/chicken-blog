const CommentService = require('../services/comment.service');
const { ApiError } = require('../utils/apiError');
const cmtservice = new CommentService();

class cmtcontroller {
  cmtPost = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const { userId } = res.locals;
      const { content } = req.body;

      await cmtservice.cmtPostService({ userId, content, postId });
      res.status(200).json({ messge: '댓글작성 완료' });
    } catch (err) {
      next(err);
    }
  };

  cmtpatch = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };

  cmtdel = async (req, res) => {};
}

module.exports = cmtcontroller;
