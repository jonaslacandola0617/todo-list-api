import { NextFunction, Request, Response } from 'express';

type AsyncFunc = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

function catchAsync(fn: AsyncFunc) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export default catchAsync;
