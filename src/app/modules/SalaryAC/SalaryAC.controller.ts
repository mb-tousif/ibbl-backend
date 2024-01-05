
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { SalaryACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { SalaryACFilterFields } from "./Saving_AC.interfaces";
import { SalaryAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createSalaryAC = CatchAsync(async (req: Request, res: Response) => {
   const SalaryAC = await SalaryACService.createSalaryAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: SalaryAC,
   });
 });

//  Get all Saving AC
const getAllSalaryAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, SalaryACFilterFields);
  const SalaryAC = await SalaryACService.getAllSalaryAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: SalaryAC,
  });
});

// Get Saving AC by id
const getSalaryACById = CatchAsync(async (req: Request, res: Response) => {
  const SalaryAC = await SalaryACService.getSalaryACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: SalaryAC,
  });
});

// Update Saving AC by id
const updateSalaryACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await SalaryAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const SalaryAC = await SalaryACService.updateSalaryACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: SalaryAC,
  });
});

export const SalaryACController = {
  createSalaryAC,
  getAllSalaryAC,
  getSalaryACById,
  updateSalaryACById,
};

