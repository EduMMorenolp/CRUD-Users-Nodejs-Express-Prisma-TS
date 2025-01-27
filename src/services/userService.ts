// ./src/services/userService.js

import {
  deleteUserModel,
  getAllUsersModel,
  getUserByIdModel,
  updateUserModel,
  restoreUserModel,
} from "../models/userModel.js";
import { hashPassword } from "../utils/bcrypt.js";

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
  username: string,
  email: string,
  password: string
) => {
  const passwordHash = await hashPassword(password);
  return await updateUserModel(id, username, email, passwordHash);
};

// Eliminar usuario
export const deleteUserService = async (id: string) => {
  return await deleteUserModel(id);
};

export const restoreUserService = async (id: string) => {
  return await restoreUserModel(id);
};

