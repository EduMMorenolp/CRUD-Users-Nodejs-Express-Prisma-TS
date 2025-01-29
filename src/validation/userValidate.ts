// @ts-ignore
import { body } from "express-validator";

export const validateUpdateUser = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres."),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El correo electrónico no puede estar vacío.")
    .isEmail()
    .withMessage("El correo electrónico debe tener un formato válido."),
];
