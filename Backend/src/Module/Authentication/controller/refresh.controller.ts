import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import { UserModel } from "../../../schema/User/user.schema";
import { accountToken } from "../../../Utils/Guards/JWT/token.jwt";
import jwt from "jsonwebtoken";
import ApiError from "../../../Utils/api.errors.utils";

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN as string;

export const refreshController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const cookie = req.cookies;
          if (!cookie.__ssdt) {
             next (new ApiError("No refrsh token founded, please sign in agin", 401));
             return
          }

          if( !cookie.__srmt){
               jwt.verify(cookie.__ssdt, REFRESH_TOKEN_SECRET, async (err: any, decoded: any): Promise<any> => {
                 if (err){
                    next (new ApiError("Refrsh token is not valid, please sign in again", 401));
                    return
                 } 
            
                 const foundUser = await UserModel.findOne({ _id: decoded._id, status: "active" }, {
                    _id:1,
                 });
            
                 if (!foundUser){
                    next(new ApiError("User not founded", 404));
                    return
                 }
                 const token = accountToken(foundUser?._id);
                 res.cookie("__srmt", token, { httpOnly: true, secure: true, sameSite: "none",maxAge: 1000 * 60 * 30}); // access token with 30 minutes expiration
                 res.status(200).json({ code: 200, status: "OK", message: "Success create new access token" });
               });
          }
          else{
               res.status(200).json({ code: 200, status: "OK", message: "access token not expierd yet" });
          }
        }
)
