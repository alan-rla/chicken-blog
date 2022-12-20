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
      const { postId, commentId } = req.params;

      const { content } = req.body;
      const { userId } = res.locals;

      await cmtservice.cmtPatchService({ userId, postId, commentId, content });
      res.status(200).json({ messge: '댓글 수정 완료.' });
    } catch (err) {
      next(err);
    }
  };

  cmtdel = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { userId } = res.locals;
      
      await cmtservice.smtDelService({ postId, commentId, userId });

      res.status(200).json({ messge: '댓글 삭제 성공' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = cmtcontroller;
