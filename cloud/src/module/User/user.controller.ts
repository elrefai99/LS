import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { avatarFun } from "../../Common/functions/avatar/avatar.fun";
import { pool } from "../../DATABASE/PostgreSQL";

export const userController = asyncHandler(
  async (req: Request | any, res: Response, _next: NextFunction): Promise<any> => {
    const { user, username } = req.body
    const avatar = await avatarFun(req.file?.filename, username, user)

    const insertUserQuery = `
      INSERT INTO public.images (fieldname, originalname, encoding, mimetype, destination, filename, path, size, link) 
      VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING id
    `;
    const userValues = [req.file?.fieldname, req.file?.originalname, req.file?.encoding, req.file?.mimetype, req.file?.destination, req.file?.filename, req.file?.path, req.file?.size, avatar];
    const { rows } = await pool.query(insertUserQuery, userValues);
    const userId = rows[0].id;
    res.status(200).json({ code: 200, status: "OK", message: "Success uplaod image", ss: userId })
  }
)
