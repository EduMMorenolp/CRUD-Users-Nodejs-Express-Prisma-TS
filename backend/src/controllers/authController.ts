import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  loginUserService,
  logoutUserService,
  generateAuthTokenForUser,
} from "../services/authService.js";

import { CustomError } from "../utils/CustomError.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new CustomError(
        "Todos los campos son requeridos: username, email, password",
        400
      );
    }

    const newUser = await createUserService(username, email, password);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// Controlador de login
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("Email y contraseña son requeridos", 400);
    }
    // Autenticación del usuario
    const user = await loginUserService(email, password);
    if (!user) {
      res.status(401).json({
        message: "Credenciales inválidas",
      });
      return;
    }
    const userId = user.id;
    const userRole = user.role;
    const userEmail = user.email;
    const userName = user.username;
    // Generación del token JWT
    const token = await generateAuthTokenForUser(userId, userRole);
    // Respuesta exitosa con token
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: userId,
        username: userName,
        email: userEmail,
        rol: userRole,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controlador de logout
export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError(
        "Token inválido. El payload no contiene los datos necesarios.",
        400
      );
    }
    const success = await logoutUserService(userId);
    if (!success) {
      throw new CustomError(
        "No se pudo cerrar sesión; el usuario no existe o ya estaba inactivo.",
        404
      );
    }
    res.status(200).json({ message: "Sesión cerrada exitosamente." });
  } catch (error) {
    next(error);
  }
};
