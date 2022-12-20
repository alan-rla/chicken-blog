const TodoRepository = require('../repositories/todo.repository');
const { Users, Todos } = require('../models');
const { ApiError } = require('../utils/apiError');

class TodoService {
  todoRepository = new TodoRepository(Users, Todos);

  // isMine = async (userId, todoId) => {

  // 	const { userId } = req.params
  // 	const isUser = await this.todoRepository.getTodos(todoId)
  // 	if (userId === isUser.userId) return true
  // 	else return false

  // }

  getTodos = async ({ userId }) => {
    return await this.todoRepository.getTodos({ userId });
  };

  createTodos = async ({ userId, content }) => {
    // 하루에 Todo완료 개수 제한 어떻게?
    // 현재 시간과 업데이트된 데이터베이스 자료와 비교해서 done을 카운트한다
    // done의 그 시간(0시 기준) 내 2개가 완료되면 todo를 할 수 없게 한다.
    // 하루가 지나면 완료를 취소 못하게 막기
    const date = new Date();

    if (!content) {
      throw new ApiError('TODO내용 없음.', 401);
    }

    await this.todoRepository.createTodos({ userId, content });
    return true;
  };

  updateTodos = async ({ userId, todoId, content }) => {
    if (!userId) {
      throw new ApiError('유저정보 없음', 401);
    }

    if (!todoId) {
      throw new ApiError('TODO가 없음', 401);
    }

    if (!content) {
      throw new ApiError('TODO 내용 안적음', 401);
    }

    await this.todoRepository.updateTodos({ userId, todoId, content });
  };

  updateDone = async ({ userId, todoId, done }) => {
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
    console.log(doneChecked);
    let count = 0;

    doneChecked.forEach((value) => {
      if (Object.values(value)[0] == dateString) {
        count++;
      }
    });

    if (count >= 2) {
      throw new ApiError('하루 개수 제한 2개', 403);
    }

    await this.todoRepository.updateTodos({ todoId, content, done });

    return;
  };

  deleteTodos = async ({ todoId }) => {
    if (!todoId) {
      throw new ApiError('존재하지 않는 TODO', 401);
    }

    await this.todoRepository.deleteTodos({ todoId });
  };
}

module.exports = TodoService;
