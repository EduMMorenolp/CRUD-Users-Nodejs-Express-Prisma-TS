// ./src/models/userModel.js

import prisma from "../config/prismaClient.js";

export const createUserModel = async (
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
    console.error("Error al crear el usuario:", error.message);
    throw error;
  }
};

// Obtener email de Usuario
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? user : null;
  } catch (error: any) {
    console.error("Error al obtener el mail del usuario:", error.message);
    throw error;
  }
};

// Cierre de sesion de Usuario
export const logoutUserModel = async (userId: string, state: boolean) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.isActive === state) return false;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: state },
    });

    return updatedUser ? true : false;
  } catch (error: any) {
    console.error("Error al actualizar el estado del usuario:", error.message);
    throw error;
  }
};

// Verificar si el usuario está activo
export const checkUserActive = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });
    return user ? user.isActive : false;
  } catch (error: any) {
    console.error(
      "Error al verificar que el usuario está activo:",
      error.message
    );
    throw error;
  }
};

// Obtener todos los usuarios
export const getAllUsersModel = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: { id: true, username: true, email: true },
    });
    return users;
  } catch (error: any) {
    console.error("Error al obtener los usuarios:", error.message);
    throw error;
  }
};

// Obtener usuario por ID
export const getUserByIdModel = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, email: true },
    });
    return user ? user : null;
  } catch (error: any) {
    console.error("Error al obtener el usuario:", error.message);
    throw error;
  }
};

// Actualizar usuario
export const updateUserModel = async (
  id: string,
  username: string,
  email: string,
  passwordHash: string
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email, id: { not: id }, isDeleted: false },
    });

    if (existingUser) throw new Error("El correo electrónico ya está en uso.");

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        password: passwordHash,
      },
    });
    return updatedUser ? true : false;
  } catch (error: any) {
    console.error("Error al actualizar el usuario:", error.message);
    throw error;
  }
};

// Eliminar usuario
export const deleteUserModel = async (id: string) => {
  try {
    const deletedUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
    return deletedUser ? true : false;
  } catch (error: any) {
    console.error("Error al eliminar el usuario:", error.message);
    throw error;
  }
};

// Restaurar usuario
export const restoreUserModel = async (id: string) => {
  try {
    const restoredUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: false },
    });
    return restoredUser ? true : false;
  } catch (error: any) {
    console.error("Error al restaurar el usuario:", error.message);
    throw error;
  }
};
