import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

export default (app: Application) => {
  const allowedOrigins = ["http://localhost:3000"];
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessState: 200,
  };

  app.use(helmet());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use("/v0/cdn", express.static("cdn"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan("dev"));
};
