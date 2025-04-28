import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../Utils/asyncHandler.utils";
import { createAvatarOfUserName } from "../../Common/Function/avatar.register.fun";

export const authController = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { username } = req.body

    await createAvatarOfUserName(username.split(" ").join("-"))
    res.status(200).json({ code: 200, status: "OK", link: `http://localhost:6000/v0/cdn/User/${username.split(" ").join("-")}/${username.split(" ").join("-")}.png` })
  }
)
