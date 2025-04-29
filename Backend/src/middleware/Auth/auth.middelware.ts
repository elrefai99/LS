import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { UserModel } from "../../schema/User/user.schema";
import ApiError from "../../Utils/api.errors.utils";

interface DataStored {
  _id: string;
}

interface RequestAuthentication extends Request {
  user: DataStored;
}

export const isAuthenticationStatus = async (req: RequestAuthentication | any, _res: Response, next: NextFunction): Promise<void> => {
  // Extract token from Authorization header, headers.token, or query.token
  const authHeader = req.headers.authorization;
  const tokenFromAuthHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const tokenFromHeader = req.headers.token as string;
  const tokenFromQuery = req.query.token as string;
  const cookie = req.cookies;

  // Use the first available token
  const token = tokenFromAuthHeader || tokenFromHeader || tokenFromQuery || cookie.__srmt;
  if (token) {
    const TOKEN_SECRET_KEY = process.env.USER_TOKEN as string;
    jwt.verify(token, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
      if (err) {
        next(new ApiError("Invalid or expired token. Please log in again", 403));
        return;
      }

      const user = await UserModel.findOne({ _id: decoded._id, status: "active" }, {
        refreshToken: 0,
        password: 0,
        __v: 0,
        lastSeen: 0,
        verfiy: 0,
        isOnline: 0,
        notification: 0,
        friends: 0,
      });
      console.log(user?.tokenVersion === decoded.vToken, user?.tokenVersion, decoded.vToken)
      if (user && user?.tokenVersion === decoded?.vToken) {
        req.user = user;
        next();
      }
      else {
        next(new ApiError("Can't find user by token, Please log in again", 401));
        return;
      }
    });
  } else {
    next(new ApiError("Invalid Token", 401));
    return;
  }
};
