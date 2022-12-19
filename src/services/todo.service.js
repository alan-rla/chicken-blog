const TodoRepository = require('../repositories/todo.repository')
const { Users, Todos } = require('../models')
const { ApiError } = require('../utils/apiError')

class TodoService {

	todoRepository = new TodoRepository(Users, Todos)

	// isMine = async (userId, todoId) => {

	// 	const { userId } = req.params
	// 	const isUser = await this.todoRepository.getTodos(todoId)
	// 	if (userId === isUser.userId) return true
	// 	else return false

	// }

	getTodos = async (userId) => {
		return await this.todoRepository.getTodos(userId)
	}

	getOneTodo = async ({todoId}) => {
		return await this.todoRepository.getOneTodo({todoId})
	}

	createTodos = async ({userId, content}) => {
		
	// 하루에 Todo완료 개수 제한 어떻게?
	// 현재 시간과 업데이트된 데이터베이스 자료와 비교해서 done을 카운트한다
	// done의 그 시간(0시 기준) 내 2개가 완료되면 todo를 할 수 없게 한다.	

			if (!content) {
				throw new ApiError('TODO내용을 입력해주세요.', 401)
			}

			await this.todoRepository.createTodos({userId, content})
			return true
	
	}
	
	updateTodos = async ({todoId, content}) => {
		
			const todo = await this.todoRepository.updateTodos({todoId, content})
			
			if (!todo){
				throw new ApiError('존재하지 않는 TODO입니다.', 401)
			}
		
			return true
	}

	updateDone = async ({todoId}) => {
		
		const doneChecked = await this.todoRepository.doneChecked({todoId})
		

		if(doneChecked === true){
			return await this.todoRepository.update( { done : false }, { where : done })
		}
		
		else return await this.todoRepository.update( { done : true }, { where : done })
	}

	deleteTodos = async (todoId) => {

			if (!todoId){
				throw new ApiError('존재하지 않는 TODO입니다.', 401)
			}

			await this.todoRepository.deleteTodos(todoId)

	}
}

module.exports = TodoService