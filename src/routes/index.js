const { Router } = require('express');
const userRouter = require('./user.route');
const postRouter = require('./post.route');
const commentRouter = require('./comment.route')

const router = Router();

router.get('/', (req, res) => res.send('Hi'));
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports = router;
