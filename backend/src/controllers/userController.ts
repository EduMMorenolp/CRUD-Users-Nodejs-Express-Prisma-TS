import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  restoreUserService,
} from "../services/userService.js";
import { CustomError } from "../utils/CustomError.js"; // Asegúrate de importar la clase CustomError
import { Request, Response, NextFunction } from "express";
// Obtener todos los usuarios
export const getAllUsers = async (
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

// Obtener usuario por ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError("ID de usuario no proporcionado", 400);
    }
    const userId = req.userId;
    const userRole = req.userRol;
    if (userRole === "admin") {
      const user = await getUserByIdService(id);
      if (!user) {
        throw new CustomError("Usuario no encontrado", 404); // Error personalizado con código 404
      }
      res.status(200).json(user);
    }
    if (id !== userId) {
      throw new CustomError("No tienes permiso para ver este usuario.", 403); // Error personalizado con código 403
    }
    const user = await getUserByIdService(id);
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404); // Error personalizado con código 404
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userId = req.userId;
    const userRole = req.userRol;
    if (userRole === "admin") {
      const updated = await updateUserService(id, username, email, password);
      if (!updated) {
        throw new CustomError("Usuario no encontrado para actualizar", 404); // Error personalizado con código 404
      }
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    }
    if (id !== userId) {
      throw new CustomError(
        "No tienes permiso para actualizar este usuario.",
        403
      ); // Error personalizado con código 403
    }
    // Realizar la actualización
    const updated = await updateUserService(id, username, email, password);
    if (!updated) {
      throw new CustomError("Usuario no encontrado para actualizar", 404); // Error personalizado con código 404
    }
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.userRol;
    // Verificar si el id en la URL coincide con el userId del token
    if (userRole === "admin") {
      const deleted = await deleteUserService(id);
      if (!deleted) {
        throw new CustomError("Usuario no encontrado para eliminar", 404); // Error personalizado con código 404
      }
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    }

    if (id !== userId) {
      throw new CustomError(
        "No tienes permiso para eliminar este usuario.",
        403
      ); // Error personalizado con código 403
    }
    const deleted = await deleteUserService(id);
    if (!deleted) {
      throw new CustomError("Usuario no encontrado para eliminar", 404); // Error personalizado con código 404
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

// Restaurar usuario
export const restoreUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const restored = await restoreUserService(id);
    if (!restored) {
      throw new CustomError("Usuario no encontrado para restaurar", 404); // Error personalizado con código 404
    }
    res.status(200).json({ message: "Usuario restaurado correctamente" });
  } catch (error) {
    next(error);
  }
};
