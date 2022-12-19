const PostsRepository = require('../repositories/post.repository');
const pstrepository = new PostsRepository();
class Postservice {
  creatPostService = async ({ userId, title, content }) => {

    if (!userId || !title || !content) {
      res.status(401).json({ messge: '게시글/제목/내용을 입력하십시오' });
    }

    await pstrepository.creatpost({ userId, title, content });
    return true;
  };

  

  getAllPostService = async ({userId}) => {
    console.log(userId)
    if(!userId){
      res.status(401).json({ messge: 'userId params가 없습니다.' });
    }
    const posts = await pstrepository.getAllposts({userId})
    
    return posts;
  };

  getPostService = async () => {};

  patchPostService = async () => {};

  delPostService = async () => {};
}

module.exports = Postservice;
