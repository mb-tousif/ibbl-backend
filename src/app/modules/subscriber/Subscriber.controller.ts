
import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import { SubscriberService } from "./Subscriber.service";
import sendResponse from "../../../shared/responseHandler";
import httpStatus from "http-status";

const createSubscriber = CatchAsync(async (req: Request, res: Response) => {
    const subscriber = await SubscriberService.createSubscriber(req.body);

    sendResponse(res, { 
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Subscriber created successfully",
        data: subscriber,
    });
})

const getAllSubscriber = CatchAsync(async (req: Request, res: Response) => {
    const subscribers = await SubscriberService.getAllSubscriber();

    sendResponse(res, { 
        statusCode: httpStatus.OK,
        success: true,
        message: "Subscribers fetched successfully",
        data: subscribers,
    });
});

const deleteSubscriber = CatchAsync(async (req: Request, res: Response) => {
    const subscriber = await SubscriberService.deleteSubscriber(req.params.id);

    sendResponse(res, { 
        statusCode: httpStatus.OK,
        success: true,
        message: "Subscriber deleted successfully",
        data: subscriber,
    });
});

export const SubscriberController = {
    createSubscriber,
    getAllSubscriber,
    deleteSubscriber
};
