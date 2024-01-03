import { Request, Response } from "express";
import { UserService } from "./User.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";
import CatchAsync from "../../../shared/CatchAsync";
import { handleQuery } from "../../../shared/handleQuery";
import { paginationFields } from "../../../types/paginationType";
import { userFilterableFields } from "./User.constants";

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

// Create a new management user
const createManagement = CatchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await UserService.createManagement(payload);

    sendResponse( res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Management user created successfully",
        data: user,
    });
});

// Get all users
const getAllUsers = CatchAsync(async (req: Request, res: Response) => {
    const options = handleQuery(req.query, paginationFields);
    const filters = handleQuery(req.query, userFilterableFields);
    const users = await UserService.getAllUsers(options, filters);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
});

// Get a user by id
const getUserById = CatchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});

// Update a user by id
const updateUserById = CatchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const payload = req.body;
    const user = await UserService.updateUserById(userId, payload);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: user,
    });
});

// delete a user by id
const deleteUserById = CatchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserService.deleteUserById(userId);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: user,
    });
});

export const UserController = {
    createUser,
    createManagement,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
