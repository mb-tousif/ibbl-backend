import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import { BankSummaryService } from "./BankSummary.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";

const createBank = CatchAsync(async (req: Request, res: Response) => {
  const data = await BankSummaryService.createBank(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank initial business successfully started",
    data: data,
  });
});

const getCurrentBankSummary = CatchAsync(
  async (req: Request, res: Response) => {
    const data = await BankSummaryService.getCurrentBankSummary();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bank summary fetched successfully",
      data: data,
    });
  }
);

const updateBankStatement = CatchAsync(async (req: Request, res: Response) => {
  const data = await BankSummaryService.updateBankStatement(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank summary updated successfully",
    data: data,
  });
});

export const BankSummaryController = {
  createBank,
  getCurrentBankSummary,
  updateBankStatement,
};