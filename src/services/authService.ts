import e from "express";
import {
  createUser,
  getUserByEmail,
  logoutUser,
} from "../repositories/userRepository.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
// Importa la clase de error personalizado
import { CustomError } from "../utils/CustomError.js";
import { generateAuthToken } from "../utils/jwt.js";

// Crear un nuevo usuario
export const createUserService = async (
  username: string,
  email: string,
  password: string
) => {
    // Verificar el email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new CustomError("El correo electrónico ya está en uso", 409);
    }
    // Cifrar la contraseña
    const hashedPassword = await hashPassword(password);

    // Guardar el nuevo usuario en la base de datos
    return await createUser(username, email, hashedPassword);
};

// Iniciar sesión de un usuario
export const loginUserService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new CustomError(
      "Por favor, verifica tu dirección de correo electrónico y tu contraseña e intenta nuevamente.",
      401
    );
  }
  // Comparar la contraseña
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new CustomError(
      "Por favor, verifica tu dirección de correo electrónico y tu contraseña e intenta nuevamente.",
      401
    );
  }
  const userId: string = user.id;
  const state = true;
  const userState = await logoutUser(userId, state);
  return userState;
};

export const logoutUserService = async (userId: string) => {
  const state = false;
  const success = await logoutUser(userId, state);
  if (!success) {
    throw new CustomError(
      "Parece que hubo un problema al intentar cerrar sesión. Esto puede deberse a que tu cuenta ya estaba inactiva o no existe en nuestro sistema.",
      404
    );
  }
  return true;
};

// Generar el token JWT (ya no es necesario redefinir la función)
export const generateAuthTokenForUser = (userId: string, role: string) => {
  return generateAuthToken(userId, role);
};
