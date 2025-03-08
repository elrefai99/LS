import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import fs from "fs";
import { exec } from "child_process";
import path from "path";

export const videoController = asyncHandler(
  async (req: Request | any, res: Response, _next: NextFunction) => {
    if (!req.file) {
      res.status(400).json({ error: "No video file uploaded" });
      return
    }

    const inputPath = req.file.path;
    const fileName = path.parse(req.file.filename).name; // اسم الفيديو بدون الامتداد
    const output720p = `uploads/${fileName}_720p.mp4`;
    const output1080p = `uploads/${fileName}_1080p.mp4`;

    // أوامر FFmpeg لتحويل الجودة
    const ffmpegCommand720p = `ffmpeg -i ${inputPath} -vf "scale=1280:720" -c:v libx264 -crf 23 -preset veryfast ${output720p}`;
    const ffmpegCommand1080p = `ffmpeg -i ${inputPath} -vf "scale=1920:1080" -c:v libx264 -crf 23 -preset veryfast ${output1080p}`;

    // تنفيذ الأوامر بشكل متسلسل
    exec(ffmpegCommand720p, (error720p) => {
      if (error720p) {
        console.error("Error processing 720p video:", error720p);
        res.status(500).json({ error: "Error processing 720p video" });
        return
      }

      exec(ffmpegCommand1080p, (error1080p) => {
        if (error1080p) {
          console.error("Error processing 1080p video:", error1080p);
          res.status(500).json({ error: "Error processing 1080p video" });
          return
        }

        // حذف الفيديو الأصلي بعد التحويل لتوفير المساحة
        fs.unlinkSync(inputPath);

        // إرجاع الروابط الخاصة بالجودتين
        res.json({
          video720p: `http://localhost:8000/${output720p}`,
          video1080p: `http://localhost:8000/${output1080p}`,
        });
      });
    });
  }
);
