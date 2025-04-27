import {createConnection} from 'mongoose'

export const user_database = createConnection(process.env.mongo_uri_user as string)
export const chat_database = createConnection(process.env.mongo_uri_chat as string)
export const rooms_database = createConnection(process.env.mongo_uri_rooms as string)

export const connectDB = async () => {
     user_database.on('connected', () => {
          console.log('✅ Success connected to User Database');
     });
     chat_database.on('connected', () => {
          console.log('✅ Success connected to Chat Database');
     });
     rooms_database.on('connected', () => {
          console.log('✅ Success connected to Rooms Database');
     });

     user_database.on('error', (err: any) => {
          console.error(`❌ User Database connection error: ${err}`);
     });
     chat_database.on('error', (err: any) => {
          console.error(`❌ Chat Database connection error: ${err}`);
     });
     rooms_database.on('error', (err: any) => {
          console.error(`❌ Rooms Database connection error: ${err}`);
     });
}
