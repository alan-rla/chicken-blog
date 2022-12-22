const PostsRepository = require('../repositories/post.repository');
const pstrepository = new PostsRepository();
const { ApiError } = require('../utils/apiError');
class Postservice {
  creatPostService = async ({ userId, title, content }) => {
    if (!userId || !title || !content) {
      throw new ApiError('게시글/제목/내용 확인필요', 401);
    }

    await pstrepository.creatpost({ userId, title, content });
    return true;
  };

  getAllPostService = async ({ userId }) => {
    if (!userId) {
      throw new ApiError('params 값 확인필요', 401);
    }
    const posts = await pstrepository.getAllposts({ userId });

    return posts;
  };

  getPostService = async ({ userId, postId }) => {
    if (!userId || !postId) {
      throw new ApiError('params 값 확인필요', 401);
    }

    const posts = await pstrepository.getpost({ userId, postId });
    // const comments = await pstrepository.getpostSecond({ postId });

    // const result = { ...posts, comments };
    const result = posts;

    return result;
  };

  patchPostService = async ({ someId, userId, postId, title, content }) => {
    if (!userId || !postId || !title || !content) {
      throw new ApiError('제목/내용 입력 필요', 401);
    }

    if (someId != userId) {
      throw new ApiError('둥지주인이 아님.', 403);
    }

    await pstrepository.patchpost({ postId, title, content });
    return true;
  };

  delPostService = async ({ someId, userId, postId }) => {
    if (!someId || !userId || !postId) {
      throw new ApiError('입력값 오류', 401);
    }

    if (someId != userId) {
      throw new ApiError('페이지 주인이 아님', 403);
    }

    await pstrepository.dlepost({ userId, postId });
    return true;
  };
}

module.exports = Postservice;
