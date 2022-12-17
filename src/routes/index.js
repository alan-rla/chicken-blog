const { Router } = require('express');
const userRouter = require('./user.route');
const postRouter = require('./post.route');

const router = Router();

router.get('/', (req, res) => res.send('Hi'));
router.use('/user', userRouter);
router.use('/post', postRouter);

module.exports = router;
