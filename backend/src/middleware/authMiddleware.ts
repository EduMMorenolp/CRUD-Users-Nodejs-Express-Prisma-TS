// ./src/middleware/authMiddleware.js

import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../utils/jwt.js";
import { CustomError } from "../utils/CustomError.js";

interface JwtPayload {
  userId: string;
  userRol: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new CustomError("Acceso denegado. No se proporcionó un token.", 401); // Mensaje en español
  }

  const decoded = verifyAuthToken(token);
  if (!decoded) {
    throw new CustomError("Token inválido", 400);
  }

  const { userId, userRol } = decoded as JwtPayload;

  if (!userId || !userRol) {
    throw new CustomError(
      "Token inválido. El payload no contiene los datos necesarios.",
      400
    );
  }

  req.userId = userId;
  req.userRol = userRol;
  next();
};
