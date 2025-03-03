import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { createAvatarOfUserName } from "../../Common/functions/avatar/avatar.register.fun";

export const authController = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { username } = req.body

    await createAvatarOfUserName(username.split(" ").join("-"))
    res.status(200).json({ code: 200, status: "OK", link: `http://localhost:8000/v0/cdn/user/${username.split(" ").join("-")}/${username.split(" ").join("-")}.png` })
  }
)
