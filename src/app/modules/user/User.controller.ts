import { Request, Response } from "express";
import { UserService } from "./User.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import CatchAsync from "../../../shared/CatchAsync";

// create a new user
const createUser = CatchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await UserService.createUser(payload);

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: user,
    });
}); 

export const UserController = {
    createUser,
};
