const { Sequelize, Op } = require('sequelize');

class TodoRepository {
  constructor(UserModels, TodoModels) {
    this.userModels = UserModels;
    this.todoModels = TodoModels;
  }

  getTodos = async ({ userId }) => {
    return await this.todoModels.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']],
      attributes: [
        'todoId',
        'content',
        'done',
        'createdAt',
        'updatedAt',
        [Sequelize.col('User.userId'), 'userId'],
        [Sequelize.col('User.nickname'), 'nickname'],
      ],
      include: [
        {
          model: this.userModels,
          as: 'User',
          attributes: ['userId', 'nickname'],
        },
      ],
    });
  };

  getOneTodo = async ({ todoId }) => {
    const date = await this.todoModels.findOne({
      where: { todoId },
      attributes: [
        Sequelize.fn('DATE_FORMAT', Sequelize.col('updatedAt'), '%Y-%m-%d'),
        'done',
      ],
      raw: true,
    });
    return date;
  };

  doneChecked = async ({ userId }) => {
    const done = await this.todoModels.findAll({
      where: { [Op.and]: [{ done: 1 }, { userId: userId }] },
      attributes: [
        Sequelize.fn('DATE_FORMAT', Sequelize.col('updatedAt'), '%Y-%m-%d'),
      ],
      raw: true,
    });

    return done;
  };

  createTodos = async ({ userId, content }) => {
    await this.todoModels.create({
      userId,
      content,
    });
    return true;
  };

  updateTodos = async ({ todoId, content, done }) => {
    const todo = await this.todoModels.update(
      { content, done },
      { where: { todoId } },
    );
    return todo;
  };

  deleteTodos = async ({ todoId }) => {
    await this.todoModels.destroy({
      where: { todoId },
    });
    return true;
  };
}

module.exports = TodoRepository;
