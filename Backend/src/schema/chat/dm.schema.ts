import {Schema, Types} from 'mongoose';
import { chat_database } from '../../config/mongoDB.con';

const messageSchema = new Schema({
  sender:{
    type: Types.ObjectId,
    required: true,
    index: true
  },
  receiver: {
    type: Types.ObjectId,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'deleted'],
    default: 'sent',
  },
  message: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  autoIndex: true,
});

export const DMModel = chat_database.model('DMS', messageSchema);
