import { Request } from "express";
import multer from "multer";
import path from "path";

function destination(req: Request, _file: any, callback: any) {
  const { baseUrl } = req;
  const isUser = baseUrl === "/api/user";

  const folderPath = path.join(__dirname, "../../../../cdn",
    isUser ?
      "user"
      :
      ""
  );

  callback(null, folderPath);
}

function filename(_req: Request, file: any, callback: any) {
  callback(
    null,
    parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(16)
        .toString()
        .replace(".", "")
    ) + path.extname(file.originalname)
  );
}

const multerStorage = multer.diskStorage({
  destination: destination,
  filename: filename,
});

export const uploadAvatar: any = multer({
  storage: multerStorage,
}).single("img");
