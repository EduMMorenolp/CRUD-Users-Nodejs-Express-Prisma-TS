import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Asegurar que las variables de entorno estén cargadas

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ANOTHER_ALLOWED_URL,
  "http://localhost:4000",
  "http://localhost:3000",
].filter(Boolean); // Elimina valores `undefined` o `null`

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Permitir acceso
    } else {
      callback(new Error("Not allowed by CORS")); // Bloquear acceso
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Exportar el middleware
export const corsMiddleware = cors(corsOptions);
