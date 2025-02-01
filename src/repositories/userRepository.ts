// ./src/repositories/userRepository.js

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
    throw new CustomError("Error al crear el usuario", 500);
  }
};

/**
 * Obtener email de Usuario
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? user : null;
  } catch (error: any) {
    console.error("❌ Error al obtener el usuario por email:", error.message);
    throw new CustomError("Error al buscar el usuario", 500);
  }
};

/**
 * Cierre de sesion de Usuario
 * @param userId
 * @param state
 * @returns
 */
export const logoutUser = async (userId: string, state: boolean) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.isActive === state) return null;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: state },
    });
    return updatedUser;
  } catch (error: any) {
    console.error("❌ Error al actualizar estado del usuario:", error.message);
    throw new CustomError("Error al cerrar sesión", 500);
  }
};

/**
 * Verificar si el usuario está activo
 * @param userId
 * @returns
 */
export const checkUserActive = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });
    return user ? user.isActive : false;
  } catch (error: any) {
    console.error("❌ Error al verificar usuario activo:", error.message);
    throw new CustomError("Error al verificar estado del usuario", 500);
  }
};

/**
 * Obtener todos los usuarios
 * @returns
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        role: true,
        isDeleted: true,
        createdAt: true,
      },
    });
    return users;
  } catch (error: any) {
    console.error("❌ Error al obtener los usuarios:", error.message);
    throw new CustomError("Error al obtener usuarios", 500);
  }
};

/**
 * Obtener usuario por ID
 * @param id
 * @returns
 */
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? user : null;
  } catch (error: any) {
    console.error("❌ Error al obtener usuario:", error.message);
    throw new CustomError("Error al obtener usuario", 500);
  }
};

/**
 * Actualizar usuario
 * @param id
 * @param username
 * @param email
 * @param passwordHash
 * @returns
 */
export const updateUser = async (
  id: string,
  username?: string,
  email?: string,
  passwordHash?: string
) => {
  try {
    const dataToUpdate: any = {};
    if (username) {
      dataToUpdate.username = username;
    }
    if (email) {
      dataToUpdate.email = email;
    }
    if (passwordHash) {
      dataToUpdate.password = passwordHash;
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
    return updatedUser;
  } catch (error: any) {
    console.error("❌ Error al actualizar usuario:", error.message);
    if (error.code === "P2025")
      throw new CustomError("Usuario no encontrado", 404);
    throw new CustomError("Error al actualizar usuario", 500);
  }
};

/**
 * Eliminar usuario
 * @param id
 * @returns
 */
export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
    return deletedUser ? true : false;
  } catch (error: any) {
    console.error("❌ Error al eliminar usuario:", error.message);
    throw new CustomError("Error al eliminar usuario", 500);
  }
};

/**
 * Restaurar usuario
 * @param id
 * @returns
 */
export const restoreUser = async (id: string) => {
  try {
    const restoredUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: false },
    });
    return restoredUser;
  } catch (error: any) {
    console.error("❌ Error al restaurar usuario:", error.message);
    throw new CustomError("Error al restaurar usuario", 500);
  }
};
