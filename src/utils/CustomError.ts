// src/utils/CustomError.ts

/**
 * Clase de error personalizado
 */
export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
