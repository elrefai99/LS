import { Types } from "mongoose"

export interface IDM {
  sender: Types.ObjectId
  receiver: Types.ObjectId
  message: string
}
