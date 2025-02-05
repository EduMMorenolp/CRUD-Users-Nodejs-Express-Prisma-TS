import { Request, Response, NextFunction } from "express";
// @ts-ignore
import { validationResult, validationError } from "express-validator";

import { CustomError } from "../utils/CustomError.js";

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
  res: Response,
  next: NextFunction
): void => {
  console.error("🔥 Error:", err.message);
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";
  if (res.headersSent) {
    return next(err);
  }
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

/**
 * Manejador de errores de validación
 * @param req
 * @param res
 * @param next
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Datos de entrada inválidos",
      errors: errors.array().map((error : validationError) => ({
        campo: error.param,
        mensaje: error.msg,
      })),
    });
  }
  next();
};
