const TodoService = require('../services/todo.service')

class TodoController {
    todoService = new TodoService()

    getTodos = async ( req, res, next ) => {
        try {
            return res.status(200).json({ todos : this.todoService.getTodos() })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController