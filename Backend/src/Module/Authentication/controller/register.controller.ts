import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import { validationMiddleware } from "../../../middleware/validation/validation.middleware";
import { registerDTO } from "../DTO/register.dto";
import { UserModel } from "../../../schema/User/user.schema";
import ApiError from "../../../Utils/api.errors.utils";
import bcrypt, { genSalt } from 'bcryptjs'
import { accountToken } from "../../../Utils/Guards/JWT/token.jwt";
import { refreshToken } from "../../../Utils/Guards/JWT/refresh.jwt";

export const registerController =[
     validationMiddleware(registerDTO),
     asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
               const { fullname, email, password, code, phone } = req.body as registerDTO;
          
               // Check if the user already exists
               const cUser = await UserModel.findOne({status: "active", email: email });

               if (cUser) {
                    next(new ApiError("Email already exists", 400));
                    return
               }

               const salt = await genSalt(10);
               const hashedPassword = await bcrypt.hash(password, salt);

               const username = fullname.split(" ").join(".").toLowerCase() + Math.floor(Math.random() * 1000);

               const user = new UserModel({
                    fullname,
                    email,
                    password: hashedPassword,
                    code,
                    phone,
                    username,
               })

               const token = accountToken(user._id);
               const refresh = refreshToken(user._id);
               user.refreshToken = refresh;
               await user.save();
               // res.cookie()
               res.cookie("__ssdt", refresh, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, }); // refresh token with 7 days expiration
               res.cookie("__srmt", token, { httpOnly: true, secure: true, sameSite: "none",maxAge: 1000 * 60 * 30}); // access token with 30 minutes expiration

               res.status(201).json({code: 201, status: "Created", message: "User created successfully"})
          }
     )
] 
