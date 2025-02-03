// ./src/services/userService.js

import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  restoreUser,
  searchUsers,
} from "../repositories/userRepository.js";
import { hashPassword } from "../utils/bcrypt.js";
import { CustomError } from "../utils/CustomError.js";

/**
 * Obtener todos los usuarios
 * @returns
 */
export const getAllUsersService = async () => {
  return await getAllUsers();
};

/**
 * Obtener usuario por ID
 * @param id
 * @returns
 */
export const getUserByIdService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    console.log("Error en Servicio - getUserByIdService");
    throw new CustomError("El usuario no exisssssste.", 404);
  }
  return user;
};

/**
 * Actualizar usuario
 * @param id
 * @param username
 * @param email
 * @param password
 * @returns
 */
export const updateUserService = async (
  id: string,
  username?: string,
  email?: string,
  password?: string,
  role?: string
) => {
  await getUserByIdService(id);
  let passwordHash = undefined;
  if (password) {
    passwordHash = await hashPassword(password);
  }
  await updateUser(id, username, email, passwordHash, role);
  const updatedUser = {
    id: id,
    username: username,
    email: email,
    password: password,
    role: role,
  };
  return updatedUser;
};

/**
 * Eliminar usuario
 * @param id
 * @returns
 */
export const deleteUserService = async (id: string) => {
  await getUserByIdService(id);
  return await deleteUser(id);
};

/**
 * Restaurar usuario
 * @param id
 * @returns
 */
export const restoreUserService = async (id: string) => {
  const user = await getUserByIdService(id);
  if (user.isActive) {
    throw new CustomError("El usuario ya está activo.", 400);
  }
  return await restoreUser(id);
};

/**
 * Buscar usuarios con filtros
 */
export const searchUsersService = async (filters: any) => {
  const users = await searchUsers(filters);
  return users;
};
