import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ANOTHER_ALLOWED_URL,
].filter(Boolean); // Filtra valores undefined o vacíos

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default cors(corsOptions);
