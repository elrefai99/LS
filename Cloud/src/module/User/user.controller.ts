import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../Utils/asyncHandler.utils";
import { avatarFun } from "../../Common/Function/avatar.fun";

export const userController = asyncHandler(
  async (req: Request | any, res: Response, _next: NextFunction): Promise<any> => {
    const { user } = req.body
    const avatar = await avatarFun(req.file?.filename, user)

    res.status(200).json({ code: 200, status: "OK", message: "Success uplaod image", avatar })
  }
)
