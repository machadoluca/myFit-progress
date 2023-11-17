import { Router } from 'express';
import ExerciseController from '../controllers/ExerciseController.js';

const exerciseRoutes = Router();
const exerciseController = new ExerciseController();

exerciseRoutes.get('/', exerciseController.listAllExercises);
exerciseRoutes.get('/:id', exerciseController.listById);
exerciseRoutes.post('/save-workout', exerciseController.saveExercises);

export default exerciseRoutes;
