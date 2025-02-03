// ./src/middleware/verifyAdmin.js
import { Request, Response, NextFunction } from "express";

/**
 * Verificar si el usuario es administrador
 * @param req
 * @param res
 * @param next
 */
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.userRol;
  if (userRole !== "admin") {
    res.status(403).json({
      status: "error",
      message:
        "Acceso denegado: Solo administradores pueden realizar esta acción",
    });
  }
  next();
};
