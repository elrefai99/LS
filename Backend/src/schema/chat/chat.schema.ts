import {Schema, Types} from 'mongoose';
import { chat_database } from '../../config/mongoDB.con';

const messageSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    required: true,
    index: true
  },
  room: {
    type: Types.ObjectId,
    index: true
  },
  content: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  autoIndex: true
});

export const chatModel = chat_database.model('Message', messageSchema);
