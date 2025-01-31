// @ts-ignore
import { body, checkExact } from "express-validator";

/**
 * Validaciones para el registro de usuarios
 */
export const validateUserRegister = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre debe tener entre 3 y 30 caracteres")
    .matches(/^[\w]+$/)
    .withMessage("Solo se permiten letras, números y guiones bajos"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .isLength({ max: 255 })
    .withMessage("El correo es demasiado largo"),

  body("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8, max: 100 })
    .withMessage("La contraseña debe tener entre 8 y 100 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("Debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un carácter especial")
    .not()
    .matches(/^$|\s+/)
    .withMessage("No se permiten espacios en blanco"),

  checkExact([], {
    message: "Campos adicionales no permitidos",
  }),
];

/**
 * Validaciones para el inicio de sesión de usuarios
 */
export const validateUserLogin = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Debe ser un correo válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8, max: 100 })
    .withMessage("La contraseña debe tener entre 8 y 100 caracteres"),

  checkExact([], {
    message: "Campos adicionales no permitidos",
  }),
];
