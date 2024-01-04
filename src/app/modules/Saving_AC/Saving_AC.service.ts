import httpStatus from "http-status";
import ServerAPIError from "../../../errorHandling/serverApiError";
import { ISaving } from "./Saving_AC.interfaces";
import { SavingAC } from "./Saving_AC.schema";
import { User } from "../user/User.schema";
import { ENUM_Account_Type } from "../../../constant/accountEnum";
import generateUserAccount from "../../../utils/generateAccountNo";
import { ENUM_USER_ROLE } from "../../../constant/userRole";
import { BankSummary } from "../bankSummary/BankSummary.schema";
import config from "../../../config";

const createSavingAC = async (payload: ISaving) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new ServerAPIError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAccountExits = await SavingAC.findOne({ userId: payload.userId });
  if (isAccountExits) {
    throw new ServerAPIError( httpStatus.BAD_REQUEST, "Saving account already exits");
  }

  const accountNumber = await generateUserAccount( ENUM_Account_Type.SAVING );
  await User.findByIdAndUpdate(
    { _id: isUserExist._id },
    { accountNo: accountNumber, role: ENUM_USER_ROLE.ACCOUNT_HOLDER })
  payload.accountNo = accountNumber;
  await BankSummary.updateOne( { _id: config.capital_transactions_key }, { $inc: { totalCredit : payload.depositAmount, totalCapital: payload.depositAmount } });
  return (await SavingAC.create(payload)).populate("userId");
};

// Get all Saving AC

export const SavingACService = {
  createSavingAC,
};
