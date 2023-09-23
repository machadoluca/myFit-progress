import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/user.routes.js';
import { createUserToken } from './auth/auth.js';

const app = express();

/* server request configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.post('/login', createUserToken);
app.use('/users', userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);
