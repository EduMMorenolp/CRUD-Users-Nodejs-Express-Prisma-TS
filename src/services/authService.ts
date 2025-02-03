// ./src/services/authService.js

import { getUserByEmail } from "../repositories/userRepository.js";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../repositories/authRepository.js";
// Importa las funciones de cifrado y comparación de contraseñas
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
// Importa la clase de error personalizado
import { CustomError } from "../utils/CustomError.js";
// Importa la función para generar el token JWT
import { generateAuthToken } from "../utils/jwt.js";

/**
 * Crear un nuevo usuario
 * @param username
 * @param email
 * @param password
 * @returns
 */
export const createUserService = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new CustomError("El correo electrónico ya está en uso", 409);
  }
  const hashedPassword = await hashPassword(password);
  return await createUser(username, email, hashedPassword);
};

/**
 * Iniciar sesión de un usuario
 * @param email
 * @param password
 * @returns
 */
export const loginUserService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user || user.isDeleted) {
    throw new CustomError(
      "Por favor, verifica tu dirección de correo electrónico y tu contraseña e intenta nuevamente.",
      401
    );
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new CustomError(
      "Por favor, verifica tu dirección de correo electrónico y tu contraseña e intenta nuevamente.",
      401
    );
  }
  // Generación del token JWT
  const token = await generateAuthTokenForUser(user.id, user.role);
  const userState = await loginUser(email);
  return { token, user };
};

export const logoutUserService = async (userId: string) => {
  const state = false;
  const success = await logoutUser(userId);
  if (!success) {
    throw new CustomError(
      "Parece que hubo un problema al intentar cerrar sesión. Esto puede deberse a que tu cuenta ya estaba inactiva o no existe en nuestro sistema.",
      404
    );
  }
  return true;
};

/**
 * Generar el token JWT (ya no es necesario redefinir la función)
 * @param userId
 * @param role
 * @returns
 */
export const generateAuthTokenForUser = (userId: string, role: string) => {
  return generateAuthToken(userId, role);
};
