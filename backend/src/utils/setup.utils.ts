import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./Guards/limitRequest/site.limit";
import session from "express-session";

export default (app: Application) => {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:9000"];
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
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    })
  );
  app.use("/v0/public", express.static("public"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
  app.set("trust proxy", true);
  app.use(limiter);
};
