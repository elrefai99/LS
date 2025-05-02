import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../Utils/asyncHandler.utils";
import { DMModel } from "../../../schema/chat/dm.schema";
import { UserModel } from "../../../schema/User/user.schema";
import mongoose from "mongoose";

export const dmController = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { sender, receiver, limit = 5, page=1 } = req.query;

      const [result] = await DMModel.aggregate([
        {
          $match: {
            status: "sent",
            $or: [
              {
                sender: new mongoose.Types.ObjectId(`${sender}`),
                receiver: new mongoose.Types.ObjectId(`${receiver}`)
              },
              {
                sender: new mongoose.Types.ObjectId(`${receiver}`),
                receiver: new mongoose.Types.ObjectId(`${sender}`)
              }
            ]
          }
        },
        {
          $facet: {
            data: [
              {
                $project: {
                  _id: 1,
                  sender: 1,
                  receiver: 1,
                  message: 1,
                  status: 1,
                  createdAt: 1
                }
              },
              {
                $sort: { createdAt: -1 }
              },
              {
                $skip: (Number(page) - 1) * Number(limit)
              },
              {
                $limit: Number(limit)
              }
            ],
            total: [
              {
                $count: "count"
              }
            ]
          }
        }
      ])

      const data = result?.data || []
      const total = result[0]?.total[0]?.count || 0

      const totalPage = Math.ceil(total / Number(limit))

      const hasNextPage = Number(page) < totalPage
      const hasPrevPage = Number(page) > 1
      const nextPage = hasNextPage ? Number(page) + 1 : null

      const final = []
      for(const item of data) {
        item.sender = await UserModel.findById(item.sender._id, { fullname: 1 })
        item.receiver = await UserModel.findById(item.receiver._id, { fullname: 1 })
        final.push(item)
      }

      res.status(200).json({code: 200, status: "OK",final, total, totalPage, hasNextPage, hasPrevPage, nextPage});
  }
)
