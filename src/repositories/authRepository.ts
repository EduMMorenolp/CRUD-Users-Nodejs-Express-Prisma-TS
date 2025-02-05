// ./src/repositories/authRepository.js

import prisma from "../config/prismaClient.js";
import { CustomError } from "../utils/CustomError.js";

/**
 * Crear Usuario
 * @param username
 * @param email
 * @param password
 * @returns
 */
export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return { id: user.id, username: user.username, email: user.email };
  } catch (error: any) {
    console.error("❌ Error al crear el usuario:", error.message);
    if (error.code === "P2002") {
      throw new CustomError("El correo electrónico ya está en uso", 409);
    }
    throw new CustomError("Error al crear el usuario", 500);
  }
};

/**
 * Iniciar sesion de Usuario
 * @param email
 * @param password
 * @returns
 */
export const loginUser = async (email: string) => {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { isActive: true },
    });
    return user;
  } catch (error: any) {
    console.error("❌ Error al iniciar sesión:", error.message);
    throw new CustomError("Error al iniciar sesión", 500);
  }
};

/**
 * Cierre de sesion de Usuario
 * @param userId
 * @param state
 * @returns
 */
export const logoutUser = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    return { message: "Sesión cerrada exitosamente", status: 200 };
  } catch (error: any) {
    console.error("❌ Error al actualizar estado del usuario:", error.message);
    throw new CustomError("Error al cerrar sesión", 500);
  }
};
