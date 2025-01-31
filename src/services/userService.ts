// ./src/services/userService.js

import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  restoreUser,
} from "../repositories/userRepository.js";
import { hashPassword } from "../utils/bcrypt.js";
import { CustomError } from "../utils/CustomError.js";

// Obtener todos los usuarios
export const getAllUsersService = async () => {
  return await getAllUsers();
};

// Obtener usuario por ID
export const getUserByIdService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    throw new CustomError(
      "El usuario no existe.",
      404
    );
  }
  return user;
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
    await updateUser(id, username, email, passwordHash);

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
    throw new CustomError("Error al actualizar el usuario", 500);
  }
};

// Eliminar usuario
export const deleteUserService = async (id: string) => {
  await getUserByIdService(id);
  return await deleteUser(id);
};

export const restoreUserService = async (id: string) => {
  const user = await getUserByIdService(id);
  if (user.isActive){
    throw new CustomError("El usuario ya está activo.", 400);
  }
  return await restoreUser(id);
};
