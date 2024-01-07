/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import { TransactionService } from "./Transaction.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";

// save transaction
const saveTransaction = CatchAsync(async (req: Request, res: Response) => {
    const { _id } = req.user as any;
    const payload = req.body;
    payload.userId = _id;
    const transactionData = await TransactionService.saveTransaction(payload);

    sendResponse( res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Transaction created successfully',
        data: transactionData 
    })
});

export const TransactionController = {
    saveTransaction
};
