// ./src/utils/bcryp.js

import bcrypt from "bcryptjs";

/**
 * Cifrar la contraseña
 * @param password
 * @returns
 */
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

/**
 * Comparar la contraseña con el hash
 * @param password
 * @param hashedPassword
 * @returns
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
