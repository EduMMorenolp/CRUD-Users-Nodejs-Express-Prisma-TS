// ./src/routes/userRoutes.js

import express from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

// Middlewares
import { authenticateToken } from "../middleware/authTokenMiddleware.js";
import { checkUserActiveMiddleware } from "../middleware/checkUserActiveMiddleware.js";

import { validateUpdateUser } from "../validation/userValidate.js";
import { handleValidationErrors } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * Rutas de usuarios
 */
router.get("/user/", authenticateToken, checkUserActiveMiddleware, getUserById);
router.put(
  "/user/update",
  authenticateToken,
  checkUserActiveMiddleware,
  validateUpdateUser,
  handleValidationErrors,
  updateUser
);
router.delete(
  "/user/delete",
  authenticateToken,
  checkUserActiveMiddleware,
  deleteUser
);

export default router;
