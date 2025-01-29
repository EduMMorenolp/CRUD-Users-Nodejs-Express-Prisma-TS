// ./src/services/userService.js

import {
  deleteUserModel,
  getAllUsersModel,
  getUserByIdModel,
  updateUserModel,
  restoreUserModel,
} from "../repositories/userRepository.js";
import { hashPassword } from "../utils/bcrypt.js";
import { CustomError } from "../utils/CustomError.js";

// Obtener todos los usuarios
export const getAllUsersService = async () => {
  return await getAllUsersModel();
};

// Obtener usuario por ID
export const getUserByIdService = async (id: string) => {
  return await getUserByIdModel(id);
};

// Actualizar usuario
export const updateUserService = async (
  id: string,
  username?: string,
  email?: string,
  password?: string
) => {
  try {
    let passwordHash = undefined;
    if (password) {
      passwordHash = await hashPassword(password);
    }
    await updateUserModel(id, username, email, passwordHash);

    const updatedUser = {
      id: id,
      username: username,
      email: email,
      password: password,
    };

    if (!updatedUser) {
      throw new CustomError("No se pudo actualizar el usuario.", 404);
    }

    return updatedUser;
  } catch (error) {
    console.error("Error en updateUserService:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Error al actualizar el usuario", 500);
  }
};

// Eliminar usuario
export const deleteUserService = async (id: string) => {
  return await deleteUserModel(id);
};

export const restoreUserService = async (id: string) => {
  return await restoreUserModel(id);
};
