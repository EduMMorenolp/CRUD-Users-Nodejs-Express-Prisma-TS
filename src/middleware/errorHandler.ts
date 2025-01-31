import { Request, Response, NextFunction } from "express";
// @ts-ignore
import { validationResult } from "express-validator";

import { CustomError } from "../utils/CustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: "error",
      message: "Datos de entrada inválidos",
      errors: errors.array(),
    });
  }
  next();
};