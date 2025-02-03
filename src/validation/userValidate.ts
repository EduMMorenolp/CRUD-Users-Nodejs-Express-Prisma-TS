// @ts-ignore
import { body, checkExact } from "express-validator";

/**
 * Validaciones para el Update de usuarios
 */
export const validateUpdateUser = [
  body("username")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres.")
    .matches(/^[\w]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos."
    ),

  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía.")
    .isLength({ min: 8, max: 100 })
    .withMessage("La contraseña debe tener entre 8 y 100 caracteres.")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula.")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula.")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número.")
    .matches(/[\W_]/)
    .withMessage("La contraseña debe contener al menos un carácter especial.")
    .not()
    .matches(/^$|\s+/)
    .withMessage("La contraseña no puede contener espacios en blanco."),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("El correo electrónico no puede estar vacío.")
    .isEmail()
    .withMessage("El correo electrónico debe tener un formato válido.")
    .isLength({ max: 255 })
    .withMessage("El correo electrónico no puede exceder los 255 caracteres."),

  body("role")
    .optional()
    .isString()
    .withMessage("El rol debe ser una cadena de texto.")
    .isIn(["admin", "user"])
    .withMessage("El rol debe ser 'admin' o 'user'."),

  checkExact([], {
    message: "Campos adicionales no permitidos.",
  }),
];
