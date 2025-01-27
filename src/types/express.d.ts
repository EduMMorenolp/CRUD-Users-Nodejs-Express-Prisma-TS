// types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // O el tipo adecuado para userId
      userRol?: string; // O el tipo adecuado para userRol
    }
  }
}
