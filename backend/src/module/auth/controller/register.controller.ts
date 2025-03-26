import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/Guards/asyncHandler.utils";
import { pool } from "../../../Database/PostgreSQL";
import ApiError from "../../../utils/Guards/api.errors.utils";
import bcrypt from 'bcryptjs'

export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname, phone } = req.body

    const username = fullname.split(" ").join('-')
    const query = `SELECT id FROM public.users WHERE email = $1`;
    const cUser = await pool.query(query, [email]);

    if (cUser.rows.length > 0) {
      next(new ApiError("Email already used", 400));
      return;
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const insertUserQuery = `
      INSERT INTO public.users (fullname, email, password, username, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    const userValues = [fullname, email, hash, username, phone];
    const { rows } = await pool.query(insertUserQuery, userValues);
    const userId = rows[0].id;

    res.status(201).json({ code: 200, status: "OK", message: "Seuceess", userId })
  }
)
