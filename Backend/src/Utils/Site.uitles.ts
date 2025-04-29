import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import useragent from "express-useragent";
import requestIp from "request-ip";
import { limiter } from "./Guards/limitRequest/site.limit";

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
  app.use(express.json({
    limit: "100mb"
  }));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/v0/public", express.static("public"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
  app.set("trust proxy", true);
  app.use(requestIp.mw());
  app.use(useragent.express());
  app.use(async (req: any, _res, next) => {
    const clientIP = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    req.clientIP = clientIP;
    next();
  });
  app.use(limiter);
};
