import path from 'path';
import fs from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import sharp from 'sharp';

export const avatarFun = async (imgName: any, username: any, userID: any) => {
  const basePath = path.join(__dirname, '../../../../cdn/user/');
  const userPath = path.join(basePath, username);

  const watermark = sharp(await readFile(path.join(basePath, imgName)))
    .resize({ width: 450, height: 450 })
    .webp({ quality: 50 })
    .toBuffer();

  fs.unlink(path.join(basePath, imgName), (err) => {
    if (err) console.log(err);
  });

  fs.ensureDirSync(userPath);

  const fileName = `${userID}-${Math.floor(Math.random() * 100001)}.webp`;
  const filePath = path.join(userPath, fileName);

  await writeFile(filePath, await watermark);

  return `http://localhost:8000/v0/cdn/user/${username}/${fileName}`;
};
