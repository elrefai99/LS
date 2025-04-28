import axios from 'axios';
import fs from 'fs';

export async function uploadAvatar(filePath: any, carNumber: any) {
  try {
    const response = await axios.post(`${process.env.CLOUD_URL as string}/ls/main/connect/user`, { img: fs.createReadStream(filePath), user: carNumber }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

export async function uploadAuthAvatar(username: any) {
  try {
    const response = await axios.post(`${process.env.CLOUD_URL as string}/ls/main/connect/auth`, { username });
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
