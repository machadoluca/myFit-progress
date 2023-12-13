import { Router } from 'express';
import { verifyAuth } from '../auth/auth.js';
import ExercisesController from '../controllers/ExercisesController.js';

const exerciseRoutes = Router();
const exerciseController = new ExercisesController();

exerciseRoutes.get('/', exerciseController.listAllExercises);
exerciseRoutes.get('/:id', exerciseController.listById);

export default exerciseRoutes;
