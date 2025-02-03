// src/controllers/userController.ts

import { Request, Response, NextFunction } from "express";
// Importar las funciones de los servicios
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  restoreUserService,
  searchUsersService,
} from "../services/adminService.js";
// Importar la clase de error personalizado
import { CustomError } from "../utils/CustomError.js";

/**
 * Obtener todos los usuarios
 */
export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener usuario por ID
 */
export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError("ID de usuario no proporcionado", 400);
    }
    const userRole = req.userRol;
    if (userRole === "admin") {
      const user = await getUserByIdService(id);
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
export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    const userRole = req.userRol;
    if (userRole === "admin") {
      const updated = await updateUserService(
        id,
        username,
        email,
        password,
        role
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
export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userRole = req.userRol;
    // Verificar si el id en la URL coincide con el userId del token
    if (userRole === "admin") {
      const deleted = await deleteUserService(id);
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

/**
 * Restaurar usuario
 */
export const restoreUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await restoreUserService(id);
    res.status(200).json({ message: "Usuario restaurado correctamente" });
  } catch (error) {
    next(error);
  }
};

/**
 * Buscar usuarios con filtros
 */
export const searchUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { username, email, role, isActive } = req.query;
    // Convertimos 'isActive' a booleano, si es un valor válido
    let isActiveBoolean;
    if (isActive) {
      if (isActive === "true") {
        isActiveBoolean = true;
      } else if (isActive === "false") {
        isActiveBoolean = false;
      } else {
        throw new Error("El campo 'isActive' debe ser 'true' o 'false'.");
      }
    }
    const filters = {
      username: username || undefined,
      email: email || undefined,
      role: role || undefined,
      isActive: isActiveBoolean || undefined,
    };
    const users = await searchUsersService(filters);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
