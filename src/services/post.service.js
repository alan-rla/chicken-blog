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
   
    if(!userId){
      res.status(401).json({ messge: 'userId params가 없습니다.' });
    }
    const posts = await pstrepository.getAllposts({userId})
    
    return posts;
  };

  getPostService = async ({userId, postId}) => {
    
    if(!userId || !postId){
      res.status(500).json({messge: "params의 값이 정상적이지 않습니다."})
    }

    const posts = await pstrepository.getpost({userId, postId})
    return posts;
  };

  patchPostService = async ({userId, postId}) => {

    if(!userId || !postId || !title || !content){
      res.status(500).json({errorMessge: "게시글 제목/내용을 입력하십시오."})
    }

    await pstrepository.patchpost({someId:userId, postId, title, content})



  };

  delPostService = async () => {};
}

module.exports = Postservice;
