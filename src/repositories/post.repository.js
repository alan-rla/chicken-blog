const { Posts, Comments } = require('../models/index.js')



class PostsRepository{


    creat = async (userId, title, content)=>{
        await Posts.creat({ userId, title, content})

        return res.status(200).json({ messge: "게시글 작성 성공." })

        
    }


    patchpost = async ( postId, title, content)=>{
        await Posts.update({title, content },{where : {postId: postId}})

        return res.status(200).json({ messge: "게시글을 수정했습니다." })
    }


    getAllposts = async (userId)=>{
        const posts = await Posts.findAll({
            where: {userId},
            order: [["createdAt", "desc"]],
            attributes: ["postId", "title", "updateAt"],

        })
        
        return res.status(200).json({posts})
    }


    getpost = async (userId, postId) =>{

        const post = await Posts.findAll({
            where: {userId},
            attributes: ["postId", "title", "updateAt"],
            include :[
                {
                model : Comments,
                as: Comments,
                attributes : ["commentId", "content"],
                },
                {where : {postId}},
                {order: [["createdAt", "desc"]]},
            ],

        })
        
        return res.status(200).json({post})


    }


    dlepost = async (postId) => {
        await Posts.destroy({where: {postId}})

        

        res.statsu(200).json({messge: "게시글을 삭제했습니다."})
    }


}

module.exports = PostsRepository;