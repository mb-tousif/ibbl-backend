
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { LoanACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { LoanACFilterFields } from "./Saving_AC.interfaces";
import { LoanAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createLoanAC = CatchAsync(async (req: Request, res: Response) => {
   const LoanAC = await LoanACService.createLoanAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: LoanAC,
   });
 });

//  Get all Saving AC
const getAllLoanAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, LoanACFilterFields);
  const LoanAC = await LoanACService.getAllLoanAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: LoanAC,
  });
});

// Get Saving AC by id
const getLoanACById = CatchAsync(async (req: Request, res: Response) => {
  const LoanAC = await LoanACService.getLoanACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: LoanAC,
  });
});

// Update Saving AC by id
const updateLoanACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await LoanAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const LoanAC = await LoanACService.updateLoanACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: LoanAC,
  });
});

export const LoanACController = {
  createLoanAC,
  getAllLoanAC,
  getLoanACById,
  updateLoanACById,
};

