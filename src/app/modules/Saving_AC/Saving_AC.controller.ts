import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import { SavingACService } from "./Saving_AC.service";

 const createSavingAC = CatchAsync(async (req: Request, res: Response) => {
   const savingAC = await SavingACService.createSavingAC(req.body);

   sendResponse(res, {
     statusCode: httpStatus.CREATED,
     success: true,
     message: "Saving A/C created successfully",
     data: savingAC,
   });
 });

export const SavingACController = {
  createSavingAC,
};
