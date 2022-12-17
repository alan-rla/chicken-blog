const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const userController = new UserController();

const router = Router();

module.exports = router;
