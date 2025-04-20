import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../controllers/todoControllers';

const router = Router();

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo);

export default router;
