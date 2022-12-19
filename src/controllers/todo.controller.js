const TodoService = require('../services/todo.service')
const { Users, Todos } = require('../models')
const { ApiError } = require('../utils/apiError')
const { json } = require('sequelize')

class TodoController {
    todoService = new TodoService(Users, Todos)

    getTodos = async (req, res, next) => {
        try {
					
					return res.status(200).json({ Todos : await this.todoService.getTodos()})

        } catch (err) {
            next(err)
        }
    }

    createTodos = async (req, res, next) => {
        try {

          return res.status(200).json({ message : 'TODO를 작성했습니다.', code: 200})

        } catch (err) {
            next(err)
        }
    }

    updateTodos = async (req, res, next) => {
        try {

          return res.status(200).json({ message : 'TODO를 수정했습니다.', code: 200})

        } catch (err) {
            next(err)
        }
    }

    deleteTodos = async (req, res, next) => {
        try {

          return res.status(200).json({ message : 'TODO를 삭제했습니다.', code: 200})

        } catch (err) {
            next(err)
        }
    }

    
}

module.exports = TodoController