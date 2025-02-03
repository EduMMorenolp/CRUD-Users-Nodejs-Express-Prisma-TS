const searchUsers = {
  get: {
    tags: ["Admin"],
    summary: "Buscar usuarios con filtros",
    description:
      "Permite buscar usuarios aplicando filtros opcionales como nombre de usuario, email, rol y estado activo.",
    security: [
      {
        BearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "username",
        in: "query",
        required: false,
        description:
          "Filtrar por nombre de usuario (búsqueda parcial, insensible a mayúsculas).",
        schema: {
          type: "string",
          example: "john",
        },
      },
      {
        name: "email",
        in: "query",
        required: false,
        description: "Filtrar por dirección de correo electrónico.",
        schema: {
          type: "string",
          example: "john.doe@example.com",
        },
      },
      {
        name: "role",
        in: "query",
        required: false,
        description: "Filtrar por rol del usuario.",
        schema: {
          type: "string",
          enum: ["admin", "user"],
          example: "admin",
        },
      },
      {
        name: "isActive",
        in: "query",
        required: false,
        description: "Filtrar usuarios activos o inactivos.",
        schema: {
          type: "boolean",
          example: true,
        },
      },
    ],
    responses: {
      200: {
        description: "Lista de usuarios obtenida exitosamente.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
      400: {
        description: "Solicitud inválida. Error en los parámetros de búsqueda.",
      },
      401: {
        description: "No autorizado. Token de autenticación no válido.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

export default searchUsers;
