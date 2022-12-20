const TodoService = require('../services/todo.service');
const { json } = require('sequelize');
const { ApiError } = require('../utils/apiError');

class TodoController {
  todoService = new TodoService();

  getTodos = async (req, res, next) => {
    try {
      const { userId } = req.params;
      return res
        .status(200)
        .json({ Todos: await this.todoService.getTodos({ userId }) });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  createTodos = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { content } = req.body;
      const userInfo = res.locals;

      if (userId != userInfo.userId) {
        throw new ApiError('본인페이지 아님', 403);
      }

      await this.todoService.createTodos({
        userId,
        content,
      });

      return res.status(200).json({ msg: 'TODO작성 성공' });
    } catch (err) {
      next(err);
    }
  };

  updateTodos = async (req, res, next) => {
    try {
      const userInfo = res.locals;
      const userId = req.params.userId;
      const todoId = req.params.todoId;
      const { content } = req.body;

      if (userId != userInfo.userId) {
        throw new ApiError('본인페이지 아님', 403);
      }

      if (!content) {
        throw new ApiError('TODO내용 없어 이쒸.', 401);
      }

      await this.todoService.updateTodos({
        userId,
        todoId,
        content,
      });

      return res.status(200).json({ msg: 'TODO를 수정했습니다.' });
    } catch (err) {
      next(err);
    }
  };

  updateDone = async (req, res, next) => {
    try {
      const userInfo = res.locals;
      const userId = req.params.userId;
      const todoId = req.params.todoId;
      const done = Math.min(Math.max(parseInt(req.query.done), 0), 1);

      if (userId != userInfo.userId) {
        throw new ApiError('니꺼아니야.', 403);
      }

      await this.todoService.updateDone({
        todoId,
        done,
      });

      return res.status(200).json({ msg: 'done update' });
    } catch (err) {
      next(err);
    }
  };

  deleteTodos = async (req, res, next) => {
    try {
      const userInfo = res.locals;
      const userId = req.params.userId;
      const todoId = req.params.todoId;

      if (userId != userInfo.userId) {
        throw new ApiError('니꺼아니라니까.', 403);
      }

      await this.todoService.deleteTodos({
        todoId,
      });

      return res.status(200).json({ msg: 'TODO 삭제.' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodoController;
