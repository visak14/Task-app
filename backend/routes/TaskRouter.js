const { fetchAllTasks, createTask, updateTaskById, deleteTaskById } = require('../controllers/TaskController');
const ensureAuthenticated = require('../middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, fetchAllTasks);
router.post('/', ensureAuthenticated, createTask);
router.put('/:id', ensureAuthenticated, updateTaskById);
router.delete('/:id', ensureAuthenticated, deleteTaskById);

module.exports = router;