// ./src/server.ts

import app from "./app.js";
import dotenv from "dotenv";
import { checkDatabaseConnection } from "./config/prismaClient.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.BASE_URL || "localhost:3000";

// Función para arrancar el servidor
async function startServer() {
  const isDatabaseOnline = await checkDatabaseConnection();

  if (!isDatabaseOnline) {
    console.error("🚨 El servidor no puede iniciar. Base de datos offline.");
    process.exit(1);
  }

  // Arrancar el servidor
  app.listen(PORT, () => {
    console.log("==================================================");
    console.log(`🚀 Servidor corriendo en: http://${HOST}`);
    console.log(`📃 Swagger Docs: http://${HOST}/api-docs`);
    console.log("==================================================\n");
  });
}

// Iniciar el servidor
startServer();
