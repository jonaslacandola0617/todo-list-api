import { Request, Response, NextFunction } from 'express';

import Todo from '../models/todoModel';
import APIFilters from '../utils/apiFilter';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getTodos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = new APIFilters(Todo.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const todos = await filters.query;

    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos,
      },
    });
  },
);

export const getTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo)
      throw new AppError(
        "Todo doesn't exists, no todo found with that Id",
        404,
      );

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  },
);

export const createTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTodo = req.body;

    const todo = await Todo.create(newTodo);

    res.status(201).json({
      status: 'success',
      data: {
        todo,
      },
    });
  },
);

export const updateTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!todo)
      throw new AppError(
        "Todo doesn't exists, no todo found with that Id",
        404,
      );

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  },
);

export const deleteTodo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo)
      throw new AppError(
        "Todo doesn't exists, no todo found with that Id",
        404,
      );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
