/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { StaffACService } from "./StaffAC.service";
import { StaffACFilterFields } from "./StaffAC.constants";
import {StaffAC} from "./StaffAC.schema";
import { ENUM_USER_ROLE } from "../../../constant/userRole";

 const createStaffAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const payload = req.body;
  payload.userId = _id;
  const staffAC = await StaffACService.createStaffAC(payload);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Staff A/C created successfully",
     data: staffAC,
   });
 });

//  Get all Staff AC
const getAllStaffAC = CatchAsync(async (req: Request, res: Response) => {
  const options = handleQuery(req.query, paginationFields);
  const filters = handleQuery(req.query, StaffACFilterFields);
  const StaffAC = await StaffACService.getAllStaffAC(options, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Staff A/C data fetched successfully",
    data: StaffAC,
  });
});

// Get Staff AC by id
const getStaffACById = CatchAsync(async (req: Request, res: Response) => {
  const StaffAC = await StaffACService.getStaffACById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Staff A/C data fetched successfully",
    data: StaffAC,
  });
});

// get my ac
const getMyAC = CatchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user as any;
  const staffAC = await StaffACService.getMyAC(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Staff A/C data fetched successfully",
    data: staffAC,
  });
})

// Update Staff AC by id
const updateStaffACById = CatchAsync(async (req: Request, res: Response) => {
  const staffId = req.params.id;
  const payload = req.body;
  const { _id, role } = req.user as any;
  if (role === ENUM_USER_ROLE.ACCOUNT_HOLDER) {
    const haveAccount = await StaffAC.findOne({ userId: _id });
    if (!haveAccount) {
      throw new ServerAPIError(
        httpStatus.BAD_REQUEST,
        "You don't have any Staff account"
      );
    }
  }

  const staffAC = await StaffACService.updateStaffACById(staffId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Staff A/C updated successfully",
    data: staffAC,
  });
});

export const StaffACController = {
  createStaffAC,
  getAllStaffAC,
  getStaffACById,
  getMyAC,
  updateStaffACById,
};

