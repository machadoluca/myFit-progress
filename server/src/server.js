import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import exerciseRoutes from './routes/exercises.routes.js';

const app = express();

/* server request configuration */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);
