
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { CurrentACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { CurrentACFilterFields } from "./Saving_AC.interfaces";
import { CurrentAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createCurrentAC = CatchAsync(async (req: Request, res: Response) => {
   const CurrentAC = await CurrentACService.createCurrentAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: CurrentAC,
   });
 });

//  Get all Saving AC
const getAllCurrentAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, CurrentACFilterFields);
  const CurrentAC = await CurrentACService.getAllCurrentAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: CurrentAC,
  });
});

// Get Saving AC by id
const getCurrentACById = CatchAsync(async (req: Request, res: Response) => {
  const CurrentAC = await CurrentACService.getCurrentACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: CurrentAC,
  });
});

// Update Saving AC by id
const updateCurrentACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await CurrentAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const CurrentAC = await CurrentACService.updateCurrentACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: CurrentAC,
  });
});

export const CurrentACController = {
  createCurrentAC,
  getAllCurrentAC,
  getCurrentACById,
  updateCurrentACById,
};

