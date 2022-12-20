const { Router } = require('express');
const CommentController = require('../controllers/comment.controller');
const authMW = require('../middlewares/auth');
const pstcontroller = new CommentController();
const router = Router();





module.exports = router;