import User from "../../components/schemas/user/User.js";

const getUserById = {
  get: {
    tags: ["Usuarios"],
    summary: "Obtener datos de usuario",
    description:
      "Recupera al usuario por su ID. Asegúrate de que no esté eliminado (borrado lógico).",
    security: [
      {
        BearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Usuario encontrado",
        content: {
          "application/json": {
            schema: User,
          },
        },
      },
      404: {
        description: "Usuario no encontrado o está eliminado",
      },
      500: {
        description: "Error interno del servidor",
      },
    },
  },
};

export default getUserById;
