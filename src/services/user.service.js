const { Users, Todos } = require('../models');
const UsersRepository = require('../repositories/user.repository');
const { ApiError } = require('../utils/apiError');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
const { JWT_SECRET } = process.env;

class UsersService {
  constructor(bcryptModule, jwtModule) {
    this.bcrypt = bcryptModule;
    this.jwt = jwtModule;
  }
  usersRepository = new UsersRepository(Users, Todos);

  levelConverter = function (users) {
    users.map((user) => {
      if (user.dataValues.userLevel === null) {
        user.dataValues.userLevel = 1;
      }

      return (user.dataValues.userLevel = Math.min(
        Math.max(parseInt(user.dataValues.userLevel / 1), 1),
        5,
      ));
    });
  };

  register = async ({ account, nickname, password, confirm }) => {
    if (password !== confirm)
      throw new ApiError('PW CONFIRM DOES NOT MATCH', 401);

    const existAcc = await this.usersRepository.findUserByAcc({ account });
    if (existAcc) throw new ApiError('ID ALREADY EXISTS', 401);

    const existNick = await this.usersRepository.findUserByNick({ nickname });
    if (existNick) throw new ApiError('NICKNAME ALREADY EXISTS', 401);

    const hashedPW = await this.bcrypt.hash(password, parseInt(PASSWORD_SALT));

    await this.usersRepository.createUser({ account, nickname, hashedPW });
  };

  login = async ({ account, password }) => {
    const user = await this.usersRepository.findUserByAcc({ account });
    const pwCompare = await this.bcrypt.compare(password, user.password);

    if (!user || !pwCompare) throw new ApiError('WRONG ID/PW', 401);

    const accessToken = this.jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: '24h',
    });
    const userId = user.userId;
    const nickname = user.nickname;
    return { accessToken, userId, nickname };
  };

  findUser = async ({ userId }) => {
    const userInfo = await this.usersRepository.findUserByUserId({ userId });
    if (!userInfo) throw new ApiError('CANNOT FIND USER', 401);

    this.levelConverter(userInfo);
    return userInfo[0];
  };

  randomUsers = async ({ userId }) => {
    if (userId === undefined) userId = null;

    const users = await this.usersRepository.findRandomUsers({ userId });

    // 유저 레벨 변환
    this.levelConverter(users);
    return users;
  };

  firstRandomUser = async ({}) => {
    const user = await this.usersRepository.firstRandomUser({});

    this.levelConverter(user);
    return user[0];
  };
}

module.exports = UsersService;
