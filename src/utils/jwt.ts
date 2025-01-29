// ./src/utils/jwt.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generar el token JWT
export const generateAuthToken = (userId: string, userRol: string) => {
  const payload = { userId, userRol };
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está definido en el archivo .env");
  }
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
  return token;
};

// Verificar el token JWT
export const verifyAuthToken = (token: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET no está definido en el archivo .env");
    }
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};
