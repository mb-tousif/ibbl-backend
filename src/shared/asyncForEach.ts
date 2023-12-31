import httpStatus from "http-status";
import ServerAPIError from "../errorHandling/serverApiError";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AsyncForEach = async <T>(arr: Array<T>, cb: any) => {
  if (!Array.isArray(arr)) {
    throw new ServerAPIError(httpStatus.BAD_REQUEST, "Invalid array");
  }
  for (let index = 0; index < arr.length; index++) {
    await cb(arr[index], index, arr);
  }
};
