/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { SavingACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { SavingACFilterFields } from "./Saving_AC.interfaces";
import { SavingAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createSavingAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const payload = req.body;
  payload.userId = _id;
   const savingAC = await SavingACService.createSavingAC(payload);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: savingAC,
   });
 });

//  Get all Saving AC
const getAllSavingAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, SavingACFilterFields);
  const savingAC = await SavingACService.getAllSavingAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: savingAC,
  });
});

// Get Saving AC by id
const getSavingACById = CatchAsync(async (req: Request, res: Response) => {
  const savingAC = await SavingACService.getSavingACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: savingAC,
  });
});

// Get My Saving AC
const getMyAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const staffAC = await SavingACService.getMyAC(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Saving A/C data fetched successfully",
    data: staffAC,
  });
});

// Update Saving AC by id
const updateSavingACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await SavingAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const savingAC = await SavingACService.updateSavingACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: savingAC,
  });
});

export const SavingACController = {
  createSavingAC,
  getAllSavingAC,
  getSavingACById,
  getMyAC,
  updateSavingACById,
};
