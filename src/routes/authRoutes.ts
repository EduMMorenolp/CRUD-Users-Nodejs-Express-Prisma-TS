// src/routes/authRoutes.ts

import express from "express";
import {
  registerUser,
  loginUserController,
  logoutUserController,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authTokenMiddleware.js";

import { validateUserLogin, validateUserRegister } from "../validation/authValidate.js";

import { handleValidationErrors } from "../middleware/errorHandler.js";

// Middlewares
const router = express.Router();

/**
 * Rutas de autenticación
 */
router.post(
  "/register",
  validateUserRegister,
  handleValidationErrors,
  registerUser
);
router.post(
  "/login",
  validateUserLogin,
  handleValidationErrors,
  loginUserController
);
router.post("/logout", authenticateToken, logoutUserController);

export default router;
