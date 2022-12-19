class TodoRepository {
	constructor(UserModels, TodoModels) {
		this.userModels = UserModels
		this.todoModels = TodoModels
	}

	getTodos = async ({userId}) => {
		return await this.todoModels.findAll({
			where: { userId },
			include: [
				{
					model: this.userModels,
					attributes: ['userId', 'nickname']
				}
			]
		})
	}
	
	getOneTodo = async ({todoId}) => {
		return await this.todoModels.findOne({
			where : { todoId }
		})
	}

	doneChecked = async (todoId) => {
		return await this.todoModels.findOne({
			where : { todoId },
			attributes : ['done']
		})
	}

	createTodos = async ({userId, content}) => {
		await this.todoModels.create({
			userId,
			content,      
		})
		return true
	}

	updateTodos = async ({todoId, content}) => {
		await this.todoModels.update(
			{ content },
			{ where : { todoId }}
		)
		return true
	}

	deleteTodos = async ({todoId}) => {
	await this.todoModels.destroy({
			where : { todoId }
	})
	return true
}

}

module.exports = TodoRepository