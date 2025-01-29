// ./src/routes/userRoutes.js

import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  restoreUser,
} from "../controllers/userController.js";

// Middlewares
import { authenticateToken } from "../middleware/authTokenMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { checkUserActiveMiddleware } from "../middleware/checkUserActiveMiddleware.js";

import { validateUpdateUser } from "../validation/userValidate.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  getAllUsers
);
router.get("/:id", authenticateToken, checkUserActiveMiddleware, getUserById);
router.put(
  "/update/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  validateUpdateUser,
  handleValidationErrors,
  updateUser
);
router.delete(
  "/delete/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  deleteUser
);
router.put(
  "/restore/:id",
  authenticateToken,
  checkUserActiveMiddleware,
  verifyAdmin,
  restoreUser
);

export default router;
