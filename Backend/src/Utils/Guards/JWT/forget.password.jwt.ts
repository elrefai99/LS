import jwt from "jsonwebtoken";

export const REFRESH_TOKEN_SECRET = process.env.ResetTokenSecret as string;

export const forgetpasswordToken = (email: any) => {
  return jwt.sign({ email: email }, REFRESH_TOKEN_SECRET, { expiresIn: 1 * 60 * 60 * 1000, });
};
