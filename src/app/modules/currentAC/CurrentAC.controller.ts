/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { CurrentACFilterFields } from "./CurrentAC.constants";
import { CurrentACService } from "./CurrentAC.service";
import { CurrentAC } from "./CurrentAC.schema";

 const createCurrentAC = CatchAsync(async (req: Request, res: Response) => {
   const CurrentAC = await CurrentACService.createCurrentAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Current A/C created successfully",
     data: CurrentAC,
   });
 });

//  Get all Current AC
const getAllCurrentAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, CurrentACFilterFields);
  const CurrentAC = await CurrentACService.getAllCurrentAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current A/C data fetched successfully",
    data: CurrentAC,
  });
});

// Get Current AC by id
const getCurrentACById = CatchAsync(async (req: Request, res: Response) => {
  const CurrentAC = await CurrentACService.getCurrentACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current A/C data fetched successfully",
    data: CurrentAC,
  });
});

// Get My Current AC
const getMyAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const myAccount = await CurrentACService.getMyAC(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current A/C data fetched successfully",
    data: myAccount,
  });
});

// Update Current AC by id
const updateCurrentACById = CatchAsync(async (req: Request, res: Response) => {
  const CurrentId = req.params.id;
  const payload = req.body;
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await CurrentAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any Current account"
      );
    }
  }

  const currentAC = await CurrentACService.updateCurrentACById(CurrentId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current A/C updated successfully",
    data: currentAC,
  });
});

export const CurrentACController = {
  createCurrentAC,
  getAllCurrentAC,
  getCurrentACById,
  getMyAC,
  updateCurrentACById,
};

