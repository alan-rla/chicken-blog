const { Sequelize } = require('sequelize');
class UsersRepository {
  constructor(UsersModel, TodosModel) {
    (this.usersModel = UsersModel), (this.todosModel = TodosModel);
  }

  createUser = async (account, nickname, hashedPW) => {
    await this.usersModel.create({ account, nickname, password: hashedPW });
  };

  findUserByAcc = async ({ account }) => {
    const user = await this.usersModel.findOne({ where: { account } });
    return user;
  };

  findUserByNick = async ({ nickname }) => {
    const user = await this.usersModel.findOne({ where: { nickname } });
    return user;
  };

  findUserByUserId = async ({ userId }) => {
    const userInfo = await this.usersModel.findOne({
      where: { userId },
      attributes: [
        'userId',
        'nickname',
        [Sequelize.fn('COUNT', Sequelize.col('Todos.userId')), 'userLevel'],
      ],
      include: [
        {
          model: this.todosModel,
          as: 'Todos',
          where: { done: { [Op.eq]: true } },
          attributes: [],
        },
      ],
    });
    return userInfo;
  };

  findRandomUsers = async ({ userId }) => {
    const randomUsers = await this.usersModel.findAll({
      where: { [Op.not]: { userId } },
      order: Sequelize.literal('rand()'),
      limit: 4,
    });
    return randomUsers;
  };
}

module.exports = UsersRepository;
