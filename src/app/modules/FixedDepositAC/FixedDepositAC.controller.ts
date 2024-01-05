
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { FixedDepositACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { FixedDepositACFilterFields } from "./Saving_AC.interfaces";
import { FixedDepositAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createFixedDepositAC = CatchAsync(async (req: Request, res: Response) => {
   const FixedDepositAC = await FixedDepositACService.createFixedDepositAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: FixedDepositAC,
   });
 });

//  Get all Saving AC
const getAllFixedDepositAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, FixedDepositACFilterFields);
  const FixedDepositAC = await FixedDepositACService.getAllFixedDepositAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: FixedDepositAC,
  });
});

// Get Saving AC by id
const getFixedDepositACById = CatchAsync(async (req: Request, res: Response) => {
  const FixedDepositAC = await FixedDepositACService.getFixedDepositACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: FixedDepositAC,
  });
});

// Update Saving AC by id
const updateFixedDepositACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await FixedDepositAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const FixedDepositAC = await FixedDepositACService.updateFixedDepositACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: FixedDepositAC,
  });
});

export const FixedDepositACController = {
  createFixedDepositAC,
  getAllFixedDepositAC,
  getFixedDepositACById,
  updateFixedDepositACById,
};

