import {
  createUserModel,
  getUserByEmail,
  logoutUserModel,
} from "../models/userModel.js";
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
  try {
    // Verificar el email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new CustomError("El correo electrónico ya está en uso", 409);
    }
    // Cifrar la contraseña
    const hashedPassword = await hashPassword(password);

    // Guardar el nuevo usuario en la base de datos
    return await createUserModel(username, email, hashedPassword);
  } catch (error) {
    console.error("Error en createUserService");
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Error al crear el usuario", 500);
  }
};

// Iniciar sesión de un usuario
export const loginUserService = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }
    const userId: string = user.id;

    // Comparar la contraseña
    const isMatch = await comparePassword(password, user.password);
    if (isMatch) {
      const state = true;
      const userState = await logoutUserModel(userId, state);
      return userState;
    }

    return null;
  } catch (error) {
    console.error("Error en loginUserService");
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Error en el Login Usuario", 500);
  }
};

export const logoutUserService = async (userId: string) => {
  try {
    const state = false;
    const success = await logoutUserModel(userId, state);
    if (!success) {
      throw new CustomError(
        "No se pudo cerrar sesión; el usuario no existe o ya estaba inactivo.",
        404
      );
    }
    return true;
  } catch (error) {
    console.error("Error en logoutUserService");
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Error en el Logout Usuario", 500);
  }
};

// Generar el token JWT (ya no es necesario redefinir la función)
export const generateAuthTokenForUser = (userId: string, role: string) => {
  return generateAuthToken(userId, role);
};
