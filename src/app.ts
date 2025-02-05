// ./src/app.js

import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middleware/corsMiddleware.js";

// Import Middleware
import { errorHandler } from "./middleware/errorHandler.js";

// Import Routes
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Configuracion
dotenv.config();
const app = express();
app.use(express.json());

// Aplicar el middleware de CORS
app.use(corsMiddleware);

// Swagger
// @ts-ignore
import setupSwaggerV1 from "../swagger/v1/main.js";
setupSwaggerV1(app);

// Morgan
import morgan from "morgan";
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const BASE_PATH = process.env.BASE_PATH || "";
const VERSIONS_API = process.env.VERSIONS_API || "";

// Routes
app.use(`/${BASE_PATH}/${VERSIONS_API}`, authRoutes);
app.use(`/${BASE_PATH}/${VERSIONS_API}`, userRoutes);
app.use(`/${BASE_PATH}/${VERSIONS_API}`, adminRoutes);

// Middleware para manejar errores
app.use(errorHandler);

export default app;
