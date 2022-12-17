const TodoRepository = require('../repositories/todo.repository')
const { Users, Todos } = require('../models/todos')
const { ApiError } = require('../utils/apiError')

class TodoService {
	todoRepository = new TodoRepository(Todos)

	isMine = async (userId, todoId) => {

		const { userId } = req.params
		const isUser = await this.todoRepository.getTodos(todoId)
		if (userId === isUser.userId) return true
		else return false
	}

	getOneTodos = async (todoId) => {
		return await this.todoRepository.getTodos(todoId)
	}

	createTodos = async (userId, todoId, content) => {
		
	// 하루에 Todo완료 개수 제한 어떻게?
	// 현재 시간과 업데이트된 데이터베이스 자료와 비교해서 done을 카운트한다
	// done의 그 시간(하루) 내 2개가 완료되면 todo를 할 수 없게 한다.

		try {
			if(await isMine(userId, todoId)){
				
				const { content } = req.body

				if(!content){
					return { message : "TODO 내용을 입력해주세요.", code: 401 }
				}

				await this.todoRepository.createTodos(userId, todoId, content)
				return { message: "TODO를 작성했습니다.", code: 200 }
			}

			else return { message: "본인의 TODO페이지가 아닙니다." }

		} catch (err) {
			next(err)
		}
		
	}
	
	updateTodos = async (userId, todoId, content) => {
		return await this.todoRepository.updateTodos(userId, todoId, content)
	}

	updateDone = async (todoId) => {
		if(this.updateDone(todoId) === true){
			return await this.todoRepository.update( { done : false }, { where : done })
		}
		else return await this.todoRepository.update( { done : true }, { where : done })
	}

	deleteTodos = async (userId, todoId) => {
		return await this.todoRepository.deleteTodos(userId, todoId)
	}

}

module.exports = TodoService