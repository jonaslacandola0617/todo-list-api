import { NextFunction, Request, Response } from 'express';
import { IAppError } from '../utils/types';
import AppError from '../utils/appError';

function handleCastErrorMongo(err: IAppError) {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
}

function handleDuplicateFieldsMongo(err: IAppError) {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.at(0);

  const message = `Duplicated field value: ${value}, please use another value`;

  return new AppError(message, 400);
}

function handleValidationErrorMongo(err: IAppError) {
  const errors = Object.values(err.errors!).map((el) => el.message);

  const message = `Invalid input data ${errors.join('. ')}`;

  return new AppError(message, 400);
}

function sendErrorDev(err: IAppError, res: Response) {
  res.status(err.statusCode!).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err: IAppError, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
}

function globalErrorHandler(
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') err = handleCastErrorMongo(err);
    if (err.code === 11000) err = handleDuplicateFieldsMongo(err);
    if (err.name === 'ValidationError') err = handleValidationErrorMongo(err);

    sendErrorProd(err, res);
  }
}

export default globalErrorHandler;
