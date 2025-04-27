import jwt from "jsonwebtoken";

export const SECRET_KEY = process.env.TokenSecret as string;
export const SECRET_KEY_PENDING = process.env.otpSecret as string;

export const createToken = (id: any) => {
  return jwt.sign({ _id: id }, SECRET_KEY, { expiresIn: "12h", });
};

export const pendingToken = (id: any) => {
  return jwt.sign({ _id: id }, SECRET_KEY_PENDING, { expiresIn: "10m", });
};
