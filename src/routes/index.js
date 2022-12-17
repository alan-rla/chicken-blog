const { Router } = require('express');
const userRouter = require('./user.route');

const router = Router();

router.get('/', (req, res) => res.send('Hi'));
router.use('/user', userRouter);

module.exports = router;
