const { Router } = require('express');
const CommentController = require('../controllers/comment.controller');
const authMW = require('../middlewares/auth');
const commentController = new CommentController();
const router = Router();

router.post('/:postId', authMW.isLoggedIn, commentController.cmtPost);
router.patch(
  '/:postId/:commentId',
  authMW.isLoggedIn,
  commentController.cmtpatch,
);
router.delete(
  '/:postId/:commentId',
  authMW.isLoggedIn,
  commentController.cmtdel,
);

module.exports = router;
