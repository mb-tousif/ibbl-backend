import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import { DepositsService } from "./Deposits.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";

 const createDeposit = CatchAsync( async ( req: Request, res: Response ) => {
    const payload = req.body;
    const deposit = await DepositsService.createDeposit(payload);

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Deposit created successfully",
        data: deposit
    });
})

export const DepositsController = {
    createDeposit
};
