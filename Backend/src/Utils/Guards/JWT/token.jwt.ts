import jwt from "jsonwebtoken";

export const SECRET_KEY = process.env.USER_TOKEN as string;

export const accountToken = (id: any, vToken: any) => {
  return jwt.sign({ _id: id, vToken }, SECRET_KEY, { expiresIn: "30m", });
};
