import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import ApiError from "../../../Utils/api.errors.utils";
import { UserModel } from "../../../schema/User/user.schema";

export const deleteController = asyncHandler(
     async (req: Request | any, res: Response, next: NextFunction) => {
          const { id } = req.params;
          if (req.user._id !== id) {
               next(new ApiError("You are not authorized to delete this user", 403));
               return
          }

          await UserModel.findByIdAndUpdate(id, {
               $set: {
                    status: "deleted",
               }
          }, {
               new: true,
          })

          res.status(200).json({ code: 200, status: "OK", message: "User deleted successfully" })
          return
     }
)
