import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import ApiError from "../../../Utils/api.errors.utils";
import { uploadAvatar } from "../../../Common/Pipes/cloud.pipe";
import fs from 'fs-extra'
import { UserModel } from "../../../schema/User/user.schema";

export const editController = asyncHandler(
     async (req: Request | any, res: Response, next: NextFunction) =>{
          const data = req.body;
          const { id } = req.params;
          let image
          if(req.user.id !== id){
               next(new ApiError("You are not allowed to edit this user", 403));
               return
          }
          if(req.files){
               if(req.files['img']){
                    for (let i = 0; i < req.files['img'].length; i++) {
                         if (req.files['img'][i] && req.files['img'][i].path) {
                             image = await uploadAvatar(req.files['img'][i].path, req.user.id)
                             fs.remove(req.files['img'][i].path, (err: any) => {
                                 if (err) throw err
                             })
                         }
                     }
                    data.avatar = image.avatar
               }
               await UserModel.findByIdAndUpdate(id, {
                    $set: {
                         ...data
                    }
               },{new: true})

          }
          res.status(200).json({code: 200, status: "OK", message: "User updated successfully"})
          return
     }
)
