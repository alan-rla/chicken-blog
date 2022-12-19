const { Router } = require('express');
const PostController = require('../controllers/post.controller.js');
const pstcontroller = new PostController();
const router = Router();

router.post('/:userId', pstcontroller.creatPostController);
router.patch('/');
router.get('/');
router.get('/:postId');

module.exports = router;
