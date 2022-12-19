const TodoService = require('../services/todo.service')
const { json } = require('sequelize')
const { ApiError } = require('../utils/apiError')

class TodoController {
    todoService = new TodoService()

    getTodos = async (req, res, next) => {
      try {
				return res.status(200).json({ Todos : await this.todoService.getTodos()})

      } catch (err) {
          next(err)
      }
    }

    createTodos = async (req, res, next) => {
      try {

			  const { userId } = req.params
			  const { content } = req.body
        const userInfo = res.locals

			  if (userId != userInfo.userId){
				  throw new ApiError('본인 소유의 둥지가 아닙니다.', 403)
			  }

				await this.todoService.createTodos({
					userId,
					content,
				})

        return res.status(200).json({ message : 'TODO를 작성했습니다.'})

      } catch (err) {
        	next(err)
      }
    }

    updateTodos = async (req, res, next) => {
      try {
        const userInfo = res.locals
        const userId = req.params.userId
        const todoId = req.params.todoId
        const { content } = req.body
  
        if (userId != userInfo.userId){
          throw new ApiError('본인 소유의 둥지가 아닙니다.', 403)
        }

        if (!content) {
          throw new ApiError('TODO내용을 입력해주세요.', 401)
        }

				await this.todoService.updateTodos({
          todoId,
					content,
				})

        return res.status(200).json({ message : 'TODO를 수정했습니다.'})

      } catch (err) {
          next(err)
      }
    }

    deleteTodos = async (req, res, next) => {
      try {
				
				const userInfo = res.locals
			  const userId = req.params.userId
			  const todoId = req.params.todoId

			if (userId != userInfo.userId){
				throw new ApiError('본인 소유의 둥지가 아닙니다.', 403)
			}

			await this.todoService.deleteTodos({
				todoId,
			})

      return res.status(200).json({ message : 'TODO를 삭제했습니다.' })

      } catch (err) {
          next(err)
      }
    }
		 
}

module.exports = TodoController