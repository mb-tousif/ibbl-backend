import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../types/errorType";
import handleValidationError from "../../errorHandling/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errorHandling/handleZodError";
import handleCastError from "../../errorHandling/castError";
import ServerAPIError from "../../errorHandling/serverApiError";

const GlobalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  config.env === "development"
    ? console.log(`💥 globalError`, { error })
    : console.log(`💥 globalError`, error);

  let statusCode = 500;
  let message = "⛔ Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ServerAPIError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default GlobalErrorHandler;