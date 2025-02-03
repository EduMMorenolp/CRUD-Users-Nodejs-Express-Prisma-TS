import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ La base de datos está online.");
    return true;
  } catch (error: any) {
    console.error("❌ Error al conectar con la base de datos:");

    // Manejo de errores específicos
    if (error.code === "ECONNREFUSED") {
      console.error("El servidor de la base de datos no está disponible.");
    } else if (error.code === "3D000") {
      console.error("La base de datos no existe.");
    } else if (error.code === "28P01") {
      console.error("Credenciales incorrectas.");
    }

    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export default prisma;
