const Postservice = require('../services/post.service');
const pstservice = new Postservice();
class PostController {
  creatPostController = async (req, res) => {
        try {
        const { title, content } = req.body;
        const { userId } = res.locals;
        const some = req.params;
        console.log("some", some.userId)
        console.log("user", userId)
    
        if(some.userId != userId){
            res.status(500).json({ messge: '둥지 주인이 아닙니다.' });
        }
        pstservice.creatPostService({ userId, title, content });
        return res.status(200).json({ messge: '글쓰기 성공' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ messge: '글쓰기 오류' });
        }
    };



    getAllPostController = async (req, res) =>{
        try{
            
            const {userId} = req.params;

            const posts = await pstservice.getAllPostService({userId});
            console.log( "컨트롤러단",posts)
            res.status(200).json({posts: posts})


        }catch (err){
            console.log(err);
            res.status(500).json({ messge: '게시글 조회 오류' });
        }
    }

    

}

module.exports = PostController;
