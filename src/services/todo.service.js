const TodoRepository = require('../repositories/todo.repository')
const { Users, Todos } = require('../models/todos')
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

	getOneTodos = async (todoId) => {
		return await this.todoRepository.getTodos(todoId)
	}

	createTodos = async (userId, content) => {
		
	// 하루에 Todo완료 개수 제한 어떻게?
	// 현재 시간과 업데이트된 데이터베이스 자료와 비교해서 done을 카운트한다
	// done의 그 시간(0시 기준) 내 2개가 완료되면 todo를 할 수 없게 한다.	
	
		try {

			const { userInfo } = res.locals.user
			const { userId, todoId } = req.params
			const { content } = req.body
			const existUser = await this.todoService.getOneTodos()

			if (userId !== existUser.userId){
				throw new ApiError('본인 소유의 TODO가 아닙니다.', 403)
			}

			if (!userInfo) {
				throw new ApiError('로그인이 필요한 기능입니다.', 403)
			}

			if (!todoId) {
				throw new ApiError('존재하지 않는 TODO입니다.', 400)
			}

			if (!content) {
				throw new ApiError('TODO내용을 입력해주세요.', 401)
			}

			await this.todoRepository.createTodos(userId, todoId, content)
			return { message: "TODO를 작성했습니다.", code: 200 }

		} catch (err) {
			next(err)
		}
		
	}
	
	updateTodos = async (userId, todoId, content) => {

		try {
			const { userInfo } = res.locals.user
			const { userId, todoId } = req.params
			const { content } = req.body
			const existUser = await this.todoService.getOneTodos()

			if (userId !== existUser.userId){
				throw new ApiError('본인 소유의 TODO가 아닙니다.', 403)
			}

			if (!userInfo) {
				throw new ApiError('로그인이 필요한 기능입니다.', 403)
			}

			if (!todoId){
				throw new ApiError('존재하지 않는 TODO입니다.', 401)
			}

			if (!content) {
				throw new ApiError('TODO내용을 입력해주세요.', 401)
			}
			
			await this.todoRepository.updateTodos(userId, todoId, content)
			return { message: "TODO를 수정했습니다.", code: 200 }

		} catch (err) {
			next(err)
		}
		
	}

	updateDone = async (todoId) => {
		
		const doneChecked = await this.todoRepository.doneChecked()

		if(doneChecked === true){
			return await this.todoRepository.update( { done : false }, { where : done })
		}
		
		else return await this.todoRepository.update( { done : true }, { where : done })
	}

	deleteTodos = async (todoId) => {
		try {

			const { userInfo } = res.locals.user
			const { userId, todoId } = req.params
			const existUser = await this.todoService.getOneTodos()

			if (userId !== existUser.userId){
				throw new ApiError('본인 소유의 TODO가 아닙니다.', 403)
			}

			if (!userInfo) {
				throw new ApiError('로그인이 필요한 기능입니다.', 403)
			}

			if (!todoId){
				throw new ApiError('존재하지 않는 TODO입니다.', 401)
			}

			await this.todoRepository.deleteTodos(todoId)

		} catch (err) {
			next(err)
		}
		
	}

}

module.exports = TodoService