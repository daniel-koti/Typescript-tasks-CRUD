import { Router } from 'express';
import { createTask, listTasks, listTask, updateTask, deleteTask, updateOne} from './controllers/TaskController';

const routes = Router();

routes.get('/tasks', listTasks);
routes.post('/tasks', createTask);
routes.put('/tasks/:id', updateTask);
routes.get('/tasks/:id', listTask);
routes.delete('/tasks/:id', deleteTask);
routes.patch('/tasks/:id', updateOne);

export default routes;