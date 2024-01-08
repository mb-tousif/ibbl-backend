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

// get all transaction
const getAllTransaction = CatchAsync(async (req: Request, res: Response) => {
    const result = await TransactionService.getAllTransaction();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All transaction",
        data: result
    });
});

// get transaction by id
const getTransactionById = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TransactionService.getTransactionById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Transaction by id",
        data: result
    });
});

// my transaction
const myTransaction = CatchAsync(async (req: Request, res: Response) => {
    const { _id } = req.user as any;
    const result = await TransactionService.myTransaction(_id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My transaction",
        data: result
    });
});

export const TransactionController = {
    saveTransaction,
    getAllTransaction,
    getTransactionById,
    myTransaction
};
