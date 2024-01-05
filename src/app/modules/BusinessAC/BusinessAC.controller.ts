
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { BusinessACService } from "./Saving_AC.service";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { BusinessACFilterFields } from "./Saving_AC.interfaces";
import { BusinessAC } from "./Saving_AC.schema";
import ServerAPIError from "../../../errorHandling/serverApiError";

 const createBusinessAC = CatchAsync(async (req: Request, res: Response) => {
   const BusinessAC = await BusinessACService.createBusinessAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: BusinessAC,
   });
 });

//  Get all Saving AC
const getAllBusinessAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, BusinessACFilterFields);
  const BusinessAC = await BusinessACService.getAllBusinessAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: BusinessAC,
  });
});

// Get Saving AC by id
const getBusinessACById = CatchAsync(async (req: Request, res: Response) => {
  const BusinessAC = await BusinessACService.getBusinessACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C data fetched successfully",
    data: BusinessAC,
  });
});

// Update Saving AC by id
const updateBusinessACById = CatchAsync(async (req: Request, res: Response) => {
  const savingId = req.params.id;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _id, role } = req.user as any;
  if (role === "ACCOUNT_HOLDER") {
    const haveAccount = await BusinessAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any saving account"
      );
    }
  }

  const BusinessAC = await BusinessACService.updateBusinessACById(savingId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Saving A/C updated successfully",
    data: BusinessAC,
  });
});

export const BusinessACController = {
  createBusinessAC,
  getAllBusinessAC,
  getBusinessACById,
  updateBusinessACById,
};

