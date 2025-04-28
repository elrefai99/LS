import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";

export const profileController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          res.status(200).json({code: 200, status: "OK", message: "Success get user profile", data: req.user})
          return
     }
)
