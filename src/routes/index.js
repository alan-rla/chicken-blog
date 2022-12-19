const { Router } = require('express');
const userRouter = require('./user.route');
const todoRouter = require('./todo.route')
const router = Router();

router.get('/', (req, res) => res.send('Hi'));
router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;
