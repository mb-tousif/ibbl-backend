import { ErrorRequestHandler, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../types/errorType";
import httpStatus from "http-status";
import handleValidationError from "../../errorHandling/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errorHandling/handleZodError";
import handleCastError from "../../errorHandling/castError";
import ServerAPIError from "../../errorHandling/serverApiError";

const GlobalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
) => {
  config.env === "development"
    ? console.log(`💥 globalErrorHandler ~~`, { error })
    : console.log(`💥 globalErrorHandler ~~`, error);

  let statusCode = Number(httpStatus.INTERNAL_SERVER_ERROR);
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
