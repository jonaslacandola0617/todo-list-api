export interface IAppError extends Error {
  statusCode?: number;
  code?: number;
  status: string;
  message: string;
  isOperational: boolean;
  value?: string;
  path?: string;
  errmsg?: string;
  errors?: Record<string, any>;
}
