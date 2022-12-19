const Postservice = require('../services/post.service');


class PostController {

    creatPostController = async (req,res)=>{
        try{
            const { title, content } = req.body; 
            const userId = req.params;

            return Postservice.creatPostService(userId, title, content);


        }catch (err){
            console.log(err);
            res.status(500).json({"글쓰기 오류"})

        }

    }





}







module.exports = PostController;