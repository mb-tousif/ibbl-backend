/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { LoanACService } from "./LoanAC.service";
import { LoanACFilterFields } from "./LoanAC.constants";
import { LoanAC } from "./LoanAC.schema";

 const createLoanAC = CatchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const LoanAC = await LoanACService.createLoanAC(payload);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "loan A/C created successfully",
     data: LoanAC,
   });
 });

//  Get all loan AC
const getAllLoanAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, LoanACFilterFields);
  const LoanAC = await LoanACService.getAllLoanAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "loan A/C data fetched successfully",
    data: LoanAC,
  });
});

// Get loan AC by id
const getLoanACById = CatchAsync(async (req: Request, res: Response) => {
  const LoanAC = await LoanACService.getLoanACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "loan A/C data fetched successfully",
    data: LoanAC,
  });
});

// Get My Loan AC
const getMyAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const myAccount = await LoanACService.getMyAC(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Loan A/C data fetched successfully",
    data: myAccount,
  });
});

// Update loan AC by id
const updateLoanACById = CatchAsync(async (req: Request, res: Response) => {
  const loanId = req.params.id;
  const payload = req.body;
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await LoanAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any account"
      );
    }
  }

  const loanAC = await LoanACService.updateLoanACById(loanId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "loan A/C updated successfully",
    data: loanAC,
  });
});

// give loan
const giveLoan = CatchAsync(async (req: Request, res: Response) => {
  const loanId = req.params.id;
  const payload = req.body.paidAmount;
  const loanAC = await LoanACService.giveLoan(loanId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "loan A/C instalment gave successfully",
    data: loanAC,
  });
});

export const LoanACController = {
  createLoanAC,
  getAllLoanAC,
  getLoanACById,
  getMyAC,
  updateLoanACById,
  giveLoan,
};

