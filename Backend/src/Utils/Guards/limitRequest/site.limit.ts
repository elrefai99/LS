import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

// Create the rate limit rule
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 350, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request | any) => req.clientIP, // Use custom IP
  handler: (_req: Request | any, res: Response) => {
    res.status(429).json({ code: 429, status: "Too Many Requests", message: "Too many requests from this IP, please try again after an 7 min", });
  },
});
