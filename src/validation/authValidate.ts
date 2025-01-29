// @ts-ignore
import { body } from "express-validator";

export const validateUserRegister = [
  body("username")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("email").isEmail().withMessage("Debe ser un correo válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validateUserLogin = [
  body("email").isEmail().withMessage("Debe ser un correo válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];
