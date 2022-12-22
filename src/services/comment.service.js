const e = require('express');
const CommentRepository = require('../repositories/comment.repository');
const cmtrepository = new CommentRepository();
const { ApiError } = require('../utils/apiError');

class cmtService {
  cmtPostService = async ({ userId, content, postId }) => {
    if (!userId || !content || !postId) {
      throw new ApiError('댓글 invalid 오류', 400);
    }

    await cmtrepository.cmtPots({ userId, content, postId });
    return true;
  };

  cmtPatchService = async ({ userId, postId, commentId, content }) => {
    if (!userId || !postId || !commentId || !content) {
      throw new ApiError('댓글 invalid 오류', 400);
    }

    const someuser = await cmtrepository.cmpairuser({ commentId });

    if (someuser.userId == userId) {
      await cmtrepository.cmtPatch({ commentId, content });
      return true;
    } else {
      throw new ApiError('댓글 주인이 아님.', 400);
    }
  };

  smtDelService = async ({ postId, commentId, userId }) => {
    if (!postId || !commentId || !userId) {
      throw new ApiError('댓글삭제부분 invalid 오류');
    }

    const someuser = await cmtrepository.cmpairuser({ commentId });
    if (someuser.userId == userId) {
      await cmtrepository.cmtDel({ commentId });
      return true;
    } else {
      throw new ApiError('댓글 주인이 아님.', 400);
    }
  };
}

module.exports = cmtService;
