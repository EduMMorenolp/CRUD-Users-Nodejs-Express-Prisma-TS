import { Request, Response, NextFunction } from "express";
// @ts-ignore
import { validationResult } from "express-validator";

import { CustomError } from "../utils/CustomError";

/**
 * Manejador de errores
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response
): void => {
  console.error("🛑 Error:", err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

/**
 * Manejador de errores de validaciónes
 * @param req
 * @param res
 * @param next
 */
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
