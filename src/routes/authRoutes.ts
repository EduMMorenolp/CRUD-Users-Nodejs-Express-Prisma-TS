// 

import express from 'express';
import {
    registerUser, loginUserController, logoutUserController
} from
    '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

// Middlewares
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';
import { validateRegisterUser, validateLoginUser } from
    '../validation/userValidation.js';

const router = express.Router();

router.post('/register', validateRegisterUser,
    handleValidationErrors, registerUser);
router.post('/login', validateLoginUser,
    handleValidationErrors, loginUserController);
router.post('/logout', authenticateToken, logoutUserController);

export default router;
