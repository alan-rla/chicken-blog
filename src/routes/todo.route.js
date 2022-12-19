const { Router } = require('express');
const TodosController = require('../controllers/todo.controller');
const todosController = new TodosController();
const authMW = require('../middlewares/auth');

const router = Router();

router.get('/:userId', todosController.getTodos)
router.post('/:userId', authMW.isLoggedIn, todosController.createTodos)
router.patch('/:userId/:todoId', authMW.isLoggedIn, todosController.updateTodos)
router.delete('/:userId/:todoId', authMW.isLoggedIn, todosController.deleteTodos)

module.exports = router;