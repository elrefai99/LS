import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import { validationMiddleware } from "../../../middleware/validation/validation.middleware";
import { registerDTO } from "../DTO/register.dto";
import { UserModel } from "../../../schema/User/user.schema";
import ApiError from "../../../Utils/api.errors.utils";
import bcrypt from 'bcryptjs'
import { accountToken } from "../../../Utils/Guards/JWT/token.jwt";
import { refreshToken } from "../../../Utils/Guards/JWT/refresh.jwt";

export const LoginController = [
     validationMiddleware(registerDTO),
     asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
               const { email, password } = req.body as registerDTO;

               // Check if the user already exists
               const cUser = await UserModel.findOne({ status: "active", email: email }, {
                    email: 1,
                    password: 1,
                    tokenVersion: 1,
                    _id: 1
               });

               if (!cUser) {
                    next(new ApiError("This Email Not Exist, Please try again.", 400));
                    return
               }

               const cPassword = await bcrypt.compare(password, cUser?.password);
               if (!cPassword) {
                    next(new ApiError("The password is incorrect. Please try again.", 400));
                    return
               }

               const token = accountToken(cUser?._id, cUser?.tokenVersion);
               const refresh = refreshToken(cUser?._id);
               // user.refreshToken = refresh;
               // res.cookie()
               console.log("refresh", token, cUser?._id, cUser?.tokenVersion)
               res.cookie("__ssdt", refresh, { httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production', sameSite: "lax", maxAge: 1000 * 60 * 60 * 24 * 7, }); // refresh token with 7 days expiration
               res.cookie("__srmt", token, { httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production', sameSite: "lax", maxAge: 1000 * 60 * 30 }); // access token with 30 minutes expiration

               res.status(200).json({ code: 200, status: "OK", message: "User successfully Login" })
          }
     )
] 
