import { checkUserActive } from "../repositories/userRepository.js";
import { CustomError } from "../utils/CustomError.js";
import { NextFunction, Request, Response } from "express";

/**
 * Verificar si el usuario está activo
 * @param req
 * @param res
 * @param next
 */
export const checkUserActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  try {
    if (!userId) {
      throw new CustomError(
        "Token inválido. El payload no contiene los datos necesarios.",
        400
      );
    }
    const isActive = await checkUserActive(userId);
    if (!isActive) {
      throw new CustomError("Usuario inactivo. Acceso denegado.", 403);
    }
    next();
  } catch (error) {
    console.error("Error al verificar el estado del usuario:", error);
    next(error);
  }
};
