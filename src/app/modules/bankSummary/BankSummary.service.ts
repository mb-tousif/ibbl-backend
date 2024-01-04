import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { IBankSummary } from "./BankSummary.interfaces";
import { BankSummary } from "./BankSummary.schema";
import config from "../../../config";

const createBank = async (payload:Partial<IBankSummary>) => {
    const data = await BankSummary.create(payload);
    if(!data) throw new ServerAPIError( httpStatus.INTERNAL_SERVER_ERROR, "Error while investing in bank");
    return data;
}

const getCurrentBankSummary = async () => {
    const data = await BankSummary.findOne({ _id: config.capital_transactions_key})
    if(!data) throw new ServerAPIError( httpStatus.INTERNAL_SERVER_ERROR, "Error while fetching bank summary");
    return data;
}

const updateBankStatement = async (payload:Partial<IBankSummary>) => {
    const data = await BankSummary.updateOne({ _id: config.capital_transactions_key}, payload);
    if(!data) throw new ServerAPIError( httpStatus.INTERNAL_SERVER_ERROR, "Error while updating bank summary");
    return data;
}

export const BankSummaryService = {
    createBank,
    getCurrentBankSummary,
    updateBankStatement
};
