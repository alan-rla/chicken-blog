const Postservice = require('../services/post.service');
const pstservice = new Postservice();
class PostController {
  creatPostController = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.params;

      pstservice.creatPostService({ userId, title, content });
      return res.status(200).json({ messge: '글쓰기 성공' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ messge: '글쓰기 오류' });
    }
  };
}

module.exports = PostController;
