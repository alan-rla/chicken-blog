const { Router } = require('express');
const PostController = require('../controllers/post.controller.js');
const authMW = require('../middlewares/auth');
const pstcontroller = new PostController();
const router = Router();



router.post('/:userId', authMW.isLoggedIn, pstcontroller.creatPostController);
router.patch('/');
router.get('/:userId',  authMW.isLoggedIn, pstcontroller.getAllPostController);
router.get('/:postId');

module.exports = router;
