import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import bcrypt from 'bcryptjs'
import { UserModel } from "../../../schema/User/user.schema";
import ApiError from "../../../Utils/api.errors.utils";

export const changePassword = asyncHandler(
     async (req: Request | any, res: Response, next: NextFunction) => {
          const { password, nPassword } = req.body;
          const gUser = await UserModel.findById(req.user.id, {
               password: 1,
          });

          if (!gUser) {
               next(new ApiError("User not found", 404));
          }

          const isMatch = await bcrypt.compare(password, gUser!.password);
          if (!isMatch) {
               next(new ApiError("Password is incorrect", 400));
               return
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(nPassword, salt);

          await gUser!.updateOne({
               $set: {
                    password: hashedPassword,
               },
               $inc: {
                    tokenVersion: 1,
               },
          }, { new: true })

          res.status(200).json({ code: 200, status: "OK", message: "Password changed successfully" })
     }
)
