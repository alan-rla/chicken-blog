class TodoRepository {
    constructor(UserModels, TodoModels) {
        this.userModels = UserModels
        this.todoModels = TodoModels
    }

    getTodos = async (userId) => {
        return await this.todoModels.findAll({
            where: { userId },
            order: ["createdAt", "DESC"],
            include: [
                {
                    model: this.userModels,
                    attributes: ['userId', 'nickname']
                }
            ]
        })
    }
    
    getOneTodos = async (todoId) => {
        return await this.todoModels.findOne({
            where : { todoId : todoId }
        })
    }

    doneChecked = async (todoId) => {
        return await this.todoModels.findOne({
            where : { todoId },
            attributes : ['done']
        })
    }

    createTodos = async (userId, todoId, content) => {
        return await this.todoModels.create({
            todoId,
            userId,
            content,      
        })
    }

    updateTodos = async (todoId, content) => {
        return await this.todoModels.update(
            { content },
            { where : { todoId }}
        )
    }

    deleteTodos = async (todoId) => {
        return await this.todoModels.destroy({
            where : { todoId }
        })
    }

}

module.exports = TodoRepository