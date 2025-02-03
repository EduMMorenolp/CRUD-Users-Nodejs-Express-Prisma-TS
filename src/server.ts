// ./src/server.ts

import app from "./app.js";
import dotenv from "dotenv";
import { checkDatabaseConnection } from "./config/checkDatabase.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

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
    console.log(`🚀 Servidor corriendo en: http://${HOST}:${PORT}`);
    console.log(`📃 Swagger Docs: http://${HOST}:${PORT}/api-docs`);
    console.log("==================================================\n");
  });
}

// Iniciar el servidor
startServer();
