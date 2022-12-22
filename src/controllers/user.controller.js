const UsersService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerSchema,
  loginSchema,
} = require('../validations/user.validation');

class UsersController {
  constructor() {
    this.usersService = new UsersService(bcrypt, jwt);
  }

  register = async (req, res, next) => {
    try {
      const { account, nickname, password, confirm } =
        await registerSchema.validateAsync(req.body);
      await this.usersService.register({
        account,
        nickname,
        password,
        confirm,
      });

      res.status(200).json({ msg: 'REGISTER COMPLETE' });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { account, password } = await loginSchema.validateAsync(req.body);
      const accessToken = await this.usersService.login({ account, password });

      res.status(200).json(accessToken);
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.status(200).clearCookie('token').json({ msg: 'LOGOUT' });
    } catch (err) {
      next(err);
    }
  };

  findUser = async (req, res, next) => {
    const { userId } = req.params;
    if (userId === 'neighbor') {
      next();
    } else if (userId === 'random') {
      next();
    } else {
      try {
        const userInfo = await this.usersService.findUser({ userId });

        res.status(200).json({ userInfo });
      } catch (err) {
        next(err);
      }
    }
  };

  randomUsers = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const randomUsers = await this.usersService.randomUsers({ userId });

      res.status(200).json({ randomUsers });
    } catch (err) {
      next(err);
    }
  };

  firstRandomUser = async (req, res, next) => {
    try {
      const randomUser = await this.usersService.firstRandomUser({});

      res.status(200).json({ randomUser });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UsersController;
