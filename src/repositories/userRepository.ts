// ./src/repositories/userRepository.js

import prisma from "../config/prismaClient.js";

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
export const getAllUsers = async () => {
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
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? user : null;
  } catch (error: any) {
    console.error("Error al obtener el usuario:", error.message);
    throw error;
  }
};

// Actualizar usuario
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
    console.error("Error al actualizar el usuario:", error.message);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id: string) => {
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
export const restoreUser = async (id: string) => {
  try {
    const restoredUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: false },
    });
    return restoredUser;
  } catch (error: any) {
    console.error("Error al restaurar el usuario:", error.message);
    throw error;
  }
};
