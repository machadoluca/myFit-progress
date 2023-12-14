import { Router } from 'express';
import {
  ClientController,
  TreinerController
} from '../controllers/UsersController.js';
import { verifyAuth, createUserToken, decodeToken } from '../auth/auth.js';

const userRoutes = Router();
const clientController = new ClientController();
const treinerController = new TreinerController();

userRoutes.post('/create', clientController.createUser);
userRoutes.delete('/delete', clientController.deleteUser);
userRoutes.post('/edit', decodeToken, clientController.editSchedule);
userRoutes.get('/schedule', decodeToken, clientController.showSchedule);
userRoutes.post('/login', createUserToken);
userRoutes.get('/validate', verifyAuth);

export default userRoutes;
