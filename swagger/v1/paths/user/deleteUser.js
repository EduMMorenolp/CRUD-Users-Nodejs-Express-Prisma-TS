const deleteUser = {
  delete: {
    tags: ["Usuarios"],
    summary: "Eliminar usuario (borrado lógico)",
    description:
      "Marca un usuario como eliminado sin eliminarlo físicamente de la base de datos.",
    security: [
      {
        BearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Usuario eliminado correctamente (borrado lógico)",
      },
      404: {
        description: "Usuario no encontrado",
      },
      500: {
        description: "Error interno del servidor",
      },
    },
  },
};

export default deleteUser;
