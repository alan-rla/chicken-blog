const { Router } = require('express');
const postController = require('../controllers/post.controller.js');


const router = Router();

router.post('/', postController, )
router.patch('/', postController)
router.get('/', postController)
router.get('/:postId', postController)



module.exports = router;
