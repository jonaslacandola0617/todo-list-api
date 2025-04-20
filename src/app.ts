import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import todoRouter from './routes/todoRoutes';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorControllers';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/v1/todos', todoRouter);
// app.use('/api/v1/users');

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(err);
});

app.use(globalErrorHandler);

export default app;
