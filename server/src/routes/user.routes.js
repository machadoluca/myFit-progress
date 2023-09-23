import { Router } from 'express';
import { verifyAuth } from '../auth/auth.js';
import UserController from '../controllers/UserController.js';

const userRoutes = Router();
const userController = new UserController();

/* list all clients with authetication */
userRoutes.get('/', verifyAuth, userController.returnUsers);

userRoutes.post('/create', userController.createUser);
userRoutes.delete('/delete', userController.deleteUser);

export default userRoutes;
