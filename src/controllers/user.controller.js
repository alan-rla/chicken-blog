const UsersService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsersController {
  constructor() {
    this.usersService = new UsersService(bcrypt, jwt);
  }

  register = async (req, res, next) => {
    try {
      const { account, nickname, password, confirm } = req.body;
      await this.usersService.register({
        account,
        nickname,
        password,
        confirm,
      });

      res.status(200).json({ message: `${nickname}님이 회원가입 하셨습니다.` });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { account, password } = req.body;
      const accessToken = await this.usersService.login({ account, password });

      res
        .status(200)
        .cookie('token', accessToken)
        .json({ message: '로그인에 성공했습니다.', accessToken });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      res
        .status(200)
        .clearCookie('token')
        .json({ message: '로그아웃에 성공했습니다.' });
    } catch (err) {
      next(err);
    }
  };

  findUser = async (req, res, next) => {
    const { userId } = req.params;
    if (userId === 'neighbor') {
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
}

module.exports = UsersController;
