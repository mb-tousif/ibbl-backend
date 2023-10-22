import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./app/routes";
import GlobalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

//Testing
app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h3 style='text-align: center; padding: 20px; color:tomato'>🐱‍🏍 Welcome to ${config.app_name} API 🐱‍🏍</h3>`
  );
});

//Global error handler
app.use(GlobalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
