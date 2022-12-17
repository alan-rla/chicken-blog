class TodoRepository {
    constructor(TodoModels) {
        this.todoModels = TodoModels
    }

    getTodos = async () => {
        return await this.todoModels.findAll()
    }
    
    getOneTodos = async () => {
        return await this.todoModels.findOne({
            where : { todoId : todoId }
        })
    }

    doneChecked = async () => {
        return await this.todoModels.findOne({
            where : { done : done } 
        })
    }

    createTodos = async () => {
        return await this.todoModels.create({
            todoId,
            userId,
            content,      
        })
    }

    updateTodos = async () => {
        return await this.todoModels.update(
            { content },
            { where : { todoId }}
        )
    }

    deleteTodos = async () => {
        return await this.todoModels.destroy({
            where : { todoId }
        })
    }

}

module.exports = TodoRepository