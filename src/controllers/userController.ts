// src/controllers/userController.ts

import { Request, Response, NextFunction } from "express";
// Importar las funciones de los servicios
import {
  deleteUserService,
  getUserByIdService,
  updateUserService,
} from "../services/userService.js";
// Importar la clase de error personalizado
import { CustomError } from "../utils/CustomError.js";

/**
 * Obtener usuario por ID
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (userId) {
      const user = await getUserByIdService(userId);
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isAcitve: user.isActive,
        isDeleted: user.isDeleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res.status(200).json(userData);
    } else {
      throw new CustomError("No tienes permiso para ver este usuario.", 403);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar usuario
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const userId = req.userId;
    if (userId) {
      const updated = await updateUserService(
        userId,
        username,
        email,
        password
      );
      if (!updated) {
        throw new CustomError("Usuario no encontrado para actualizar", 404);
      }
      res.status(200).json({ message: "Campos Actualizados", updated });
    } else {
      throw new CustomError(
        "No tienes permiso para actualizar este usuario.",
        403
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar usuario
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (userId) {
      const deleted = await deleteUserService(userId);
      if (!deleted) {
        throw new CustomError("Usuario no encontrado para eliminar", 404);
        404;
      }
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      throw new CustomError(
        "No tienes permiso para eliminar este usuario.",
        403
      );
    }
  } catch (error) {
    next(error);
  }
};
