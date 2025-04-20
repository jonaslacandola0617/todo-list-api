import { IAppError } from './types';

class AppError extends Error implements IAppError {
  statusCode?: number | undefined;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
