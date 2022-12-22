const { Router } = require('express');
const UsersController = require('../controllers/user.controller');
const usersController = new UsersController();
const authMW = require('../middlewares/auth');

const router = Router();

router.post('/register', authMW.isNotLoggedIn, usersController.register);
router.post('/login', authMW.isNotLoggedIn, usersController.login);
router.get('/logout', authMW.isLoggedIn, usersController.logout);
router.get('/:userId', usersController.findUser);
router.get('/neighbor', usersController.randomUsers);
router.get('/random', usersController.firstRandomUser);

module.exports = router;
