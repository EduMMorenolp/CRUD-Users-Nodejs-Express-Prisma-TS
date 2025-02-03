// ./src/routes/userRoutes.js

import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  restoreUserController,
  searchUserController,
} from "../controllers/adminController.js";

// Middlewares
import { authenticateToken } from "../middleware/authTokenMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { checkUserActiveMiddleware } from "../middleware/checkUserActiveMiddleware.js";

import { validateUpdateUser } from "../validation/userValidate.js";
import { handleValidationErrors } from "../middleware/errorHandler.js";

const router = express.Router();

/**
 * Rutas de usuarios
 */
router.get(
  "/admin/allusers",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  getAllUsersController
);
router.get(
  "/admin/search",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  searchUserController
);

router.get(
  "/admin/users/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  getUserByIdController
);
router.put(
  "/admin/users/update/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  validateUpdateUser,
  handleValidationErrors,
  verifyAdmin,
  updateUserController
);
router.delete(
  "/admin/users/delete/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  deleteUserController
);
router.put(
  "/admin/users/restore/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  restoreUserController
);

export default router;
