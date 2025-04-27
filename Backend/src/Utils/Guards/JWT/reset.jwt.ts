import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.ResetTokenSecret as string;

const maxAge = 2 * 60 * 60;

export const resetToken = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: maxAge });
}
