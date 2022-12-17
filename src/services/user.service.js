const { Users } = require('../models');
const UserRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
const { JWT_SECRET } = process.env;

class UserService {
  constructor(bcryptModule, jwtModule) {
    this.userRepository = new UserRepository(Users);
    this.bcrypt = bcryptModule;
    this.jwt = jwtModule;
  }
}

module.exports = UserService;
