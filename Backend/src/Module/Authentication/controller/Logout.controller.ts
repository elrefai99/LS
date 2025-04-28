import { Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";

export const logoutController = asyncHandler(
     async (req: Request, res: Response) => {
          const tokenRefresh = req.cookies;
          if (!tokenRefresh.__ssdt) {
               res.status(200).json({ code: 200, status: 'OK', message: "Cookie is already deleted" });
               return
          }
          res.clearCookie("__ssdt", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("__srmt", { httpOnly: true, secure: true, sameSite: "none", });
          res.status(200).json({ code: 200, status: 'OK', message: "Cookie is deleted" });
     }
)
   