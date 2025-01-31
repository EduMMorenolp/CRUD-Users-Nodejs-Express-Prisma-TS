// ./src/app.js

import express from 'express';
import dotenv from 'dotenv';

// Import Middleware
import { errorHandler } from './middleware/errorHandler.js';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configuracion                 
dotenv.config();
const app = express();
app.use(express.json());

// Swagger
// @ts-ignore
import setupSwaggerV1 from '../swagger/v1/main.js';
setupSwaggerV1(app);

// Morgan
import morgan from 'morgan';
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// Middleware para manejar errores
app.use(errorHandler);

export default app;
