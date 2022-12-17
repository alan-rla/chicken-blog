const UserService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  constructor() {
    this.userService = new UserService(bcrypt, jwt);
  }
}

module.exports = UserController;
