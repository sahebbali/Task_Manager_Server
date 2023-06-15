const express =  require('express');
const UsersController = require('../controllers/UsersController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const TasksController = require('../controllers/TasksController')
const router  = express.Router();

router.post('/registration',UsersController.registration);
router.post('/login',UsersController.login);
router.post('/profileUpdate',AuthVerifyMiddleware, UsersController.profileUpdate);
router.post('/profileDetails', AuthVerifyMiddleware, UsersController.profileDetails);


router.post('/createTask', AuthVerifyMiddleware, TasksController.createTask);
router.get('/alltask', TasksController.getAllTasks);
router.delete('/deleteTask/:id', AuthVerifyMiddleware, TasksController.deleteTask);
router.get('/updatetasksStatus/:id/:status', AuthVerifyMiddleware, TasksController.updateTasksStatus);
router.get('/listtaskbyStatus/:status', AuthVerifyMiddleware, TasksController.listTaskByStatus);
router.get('/taststatusCount', AuthVerifyMiddleware, TasksController.taskStatusCount);

module.exports=router;