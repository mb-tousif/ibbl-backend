/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { User } from "../user/User.schema";
import { ITransaction } from "./Transaction.interfaces";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import { CurrentAC } from "../currentAC/CurrentAC.schema";
import { SavingAC } from "../Saving_AC/Saving_AC.schema";
import { StaffAC } from "../StaffAC/StaffAC.schema";
import mongoose, { Types } from "mongoose";
import { TransactionAC } from "./Transaction.schema";
import { LoanAC } from "../LoanAC/LoanAC.schema";

const saveTransaction = async (transaction: ITransaction) => {
    
  const session = await mongoose.startSession();
  try {
        session.startTransaction();
      const sender = await User.findById(transaction.userId);
      const receiver = await User.findById(transaction.receiverId);
      if (!sender && !receiver)
        throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
      let senderBalance = 0;
      let accountId = {};
      const typeOfAccount = sender?.accountNo?.slice(0, 3);
      const receiverTypeOfAccount = receiver?.accountNo?.slice(0, 3);
      if (typeOfAccount === ENUM_Account_Type.CURRENT) {
        const cashInAccount = await CurrentAC.findOne({userId: sender?._id}).select('totalBalance')
        accountId = cashInAccount?._id as any;
        senderBalance += cashInAccount?.totalBalance as number;
      }
      if(typeOfAccount === ENUM_Account_Type.SAVING){
        const cashInAccount = await SavingAC.findOne({userId: sender?._id}).select('totalBalance')
        accountId = cashInAccount?._id as any;
        senderBalance += cashInAccount?.totalBalance as number;
      }
      if (typeOfAccount === ENUM_Account_Type.STAFF) {
        const cashInAccount = await StaffAC.findOne({userId: sender?._id}).select('totalBalance')
        accountId = cashInAccount?._id as Types.ObjectId;
        senderBalance += cashInAccount?.totalBalance as number;
      }
      if (typeOfAccount === ENUM_Account_Type.LOAN) {
        throw new ServerAPIError(httpStatus.BAD_REQUEST, "You can't send money from loan account");
      }
      if (senderBalance < transaction.amount)
        throw new ServerAPIError(
          httpStatus.BAD_REQUEST,
          "Insufficient Balance"
        );
        const updateRefId = accountId.toString();
        const data = (await TransactionAC.create(transaction));
            console.log(data);
            
        if (!data) throw new ServerAPIError(httpStatus.BAD_REQUEST, "Transaction failed");
        if (typeOfAccount === ENUM_Account_Type.CURRENT) {
            // set transactionRef in currentAC
            await CurrentAC.findByIdAndUpdate(
              updateRefId,
              {
                $push: {
                  transactionRef: data._id,
                },
                $inc: {
                  totalBalance: -transaction.amount,
                  withdrawAmount: transaction.amount,
                },
              },
            );
        }
        if (typeOfAccount === ENUM_Account_Type.SAVING) {
            await SavingAC.findByIdAndUpdate(
                updateRefId,
                {
                    $push: {
                    transactionRef: data._id,
                    },
                    $inc: {
                    totalBalance: -transaction.amount,
                    withdrawAmount: transaction.amount,
                    },
                },
            );
        }
        if (typeOfAccount === ENUM_Account_Type.STAFF) {
            await StaffAC.findByIdAndUpdate(
                updateRefId,
                {
                    $push: {
                    transactionRef: data._id,
                    },
                    $inc: {
                    totalBalance: -transaction.amount,
                    withdrawAmount: transaction.amount,
                    },
                },
            );
        }
        if (receiverTypeOfAccount === ENUM_Account_Type.CURRENT) {
            await CurrentAC.findByIdAndUpdate(
                receiver?._id.toString(),
                {
                    $push: {
                    transactionRef: data._id,
                    },
                    $inc: {
                    totalBalance: transaction.amount,
                    depositAmount: transaction.amount,
                    },
                },
            );
        }
        if (receiverTypeOfAccount === ENUM_Account_Type.SAVING) {
            await SavingAC.findByIdAndUpdate(receiver?._id.toString(), {
              $push: {
                transactionRef: data._id,
              },
              $inc: {
                totalBalance: transaction.amount,
                depositAmount: transaction.amount,
              },
            });
        }
        if (receiverTypeOfAccount === ENUM_Account_Type.STAFF) {
        //    update staff account
            await StaffAC.findByIdAndUpdate(
                receiver?._id.toString(),
                {
                    $push: {
                    transactionRef: data._id,
                    },
                    $inc: {
                    totalBalance: transaction.amount,
                    depositAmount: transaction.amount,
                    },
                },
            );
        }
        if (receiverTypeOfAccount === ENUM_Account_Type.LOAN) {
            await LoanAC.findByIdAndUpdate(
                receiver?._id.toString(),
                {
                    $push: {
                    transactionRef: data._id,
                    },
                    $inc: {
                    totalLoan: transaction.amount,
                    depositAmount: transaction.amount,
                    },
                },
            );
        }
        session.commitTransaction();
        session.endSession();
        return data;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
}

export const TransactionService = {
    saveTransaction
};
