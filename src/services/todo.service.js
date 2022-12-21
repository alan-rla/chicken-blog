const TodoRepository = require('../repositories/todo.repository');
const { Users, Todos } = require('../models');
const { ApiError } = require('../utils/apiError');

class TodoService {
  todoRepository = new TodoRepository(Users, Todos);

  getTodos = async ({ userId }) => {
    return await this.todoRepository.getTodos({ userId });
  };

  createTodos = async ({ userId, content }) => {
    if (!content) {
      throw new ApiError('TODO내용 없음.', 401);
    }

    await this.todoRepository.createTodos({ userId, content });
    return true;
  };

  updateTodos = async ({ todoId, content }) => {
    const todo = await this.todoRepository.getOneTodo({ todoId });

    if (!todo) {
      throw new ApiError('존재하지 않는 TODO', 401);
    }

    const today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;

    const checkedTodoDate = await this.todoRepository.getOneTodo({ todoId });

    if (
      dateString !== Object.values(checkedTodoDate)[0] &&
      Object.values(checkedTodoDate)[1] === 1
    ) {
      throw new ApiError('날짜 지난 TODO 내용 수정 불가.', 403);
    }

    await this.todoRepository.updateTodos({ todoId, content });
  };

  updateDone = async ({ userId, todoId, done }) => {
    const todo = await this.todoRepository.getOneTodo({ todoId });
    if (!todo) {
      throw new ApiError('존재하지 않는 TODO', 401);
    }

    const today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;

    const checkedTodoDate = await this.todoRepository.getOneTodo({ todoId });

    if (
      dateString !== Object.values(checkedTodoDate)[0] &&
      Object.values(checkedTodoDate)[1] === 1
    ) {
      throw new ApiError('날짜 지난 TODO 완료 취소 불가.', 403);
    }

    const doneChecked = await this.todoRepository.doneChecked({ userId });
    let count = 0;

    doneChecked.forEach((value) => {
      if (Object.values(value)[0] == dateString) {
        count++;
      }
    });

    if (count >= 2 && done === true) {
      throw new ApiError('하루 개수 제한 2개', 403);
    }

    await this.todoRepository.updateDone({ todoId, done });

    return true;
  };

  deleteTodos = async ({ todoId }) => {
    if (!todoId) {
      throw new ApiError('존재하지 않는 TODO', 401);
    }

    await this.todoRepository.deleteTodos({ todoId });
  };
}

module.exports = TodoService;
