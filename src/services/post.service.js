const PostsRepository = require('../repositories/post.repository');



class Postservice{

    creatPostService = async (req, res, userId, title, content)=>{
        const { authorization } = req.headers;
        const [authType, authToken] = (authorization || "").split(" ");

        if (!authToken || authType !== "Bearer") {
            res.status(401).json({
              errorMessage: "로그인이 필요한 기능입니다.",
            });
        }

        //const { userId } = jwt.verify(authToken, "customized-secret-key");

        
        if(!userId || !title || !content){
            res.status(401).json({messge:"게시글/제목/내용을 입력하십시오"});
        }


        return await Postservice.creat(userId, title, content);


    }


    patchPostService = async ()=>{


        
    }


    getAllPostService = async ()=>{


        
    }


    getPostService = async ()=>{


        
    }


    delPostService = async ()=>{


        
    }






}


module.exports = Postservice;