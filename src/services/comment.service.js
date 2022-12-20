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

  cmtPatchService = async () => {};
}

module.exports = cmtService;
