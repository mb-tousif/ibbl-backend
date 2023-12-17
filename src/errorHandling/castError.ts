import mongoose from "mongoose";
import { IGenericErrorMessage } from "../types/errorType";
import httpStatus from "http-status";

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: `Invalid ${error.path}: ${error.value}`,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};

export default handleCastError;
