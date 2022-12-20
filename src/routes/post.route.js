const { Router } = require('express');
const PostController = require('../controllers/post.controller.js');
const authMW = require('../middlewares/auth');
const pstcontroller = new PostController();
const router = Router();



router.post('/:userId', authMW.isLoggedIn, pstcontroller.creatPostController);
router.patch('/:userId/:postId', authMW.isLoggedIn, pstcontroller.patchOnePostController);
router.get('/:userId',   pstcontroller.getAllPostController);
router.get('/:userId/:postId', pstcontroller.getONEPostController);
router.delete('/:userId/:postId', authMW.isLoggedIn, pstcontroller.delOnePostController )

module.exports = router;
