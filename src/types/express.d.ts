// src/types/express.d.ts

import { Request } from "express";

/**
 * Extiende la interfaz Request de Express para añadir propiedades
 */
declare global {
  namespace Express {
    interface Request {
      userId?: string; // O el tipo adecuado para userId
      userRol?: string; // O el tipo adecuado para userRol
    }
  }
}
