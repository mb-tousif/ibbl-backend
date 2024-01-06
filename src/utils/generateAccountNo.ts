import { SavingAC } from "../app/modules/Saving_AC/Saving_AC.schema";
import { ENUM_Account_Type } from "../constant/accountEnum";
import { StaffAC } from "../app/modules/StaffAC/StaffAC.schema";
// import { CurrentAC } from "../app/modules/currentAC/CurrentAC.schema";
// import { FixedDepositAC } from "../app/modules/FixedDepositAC/FixedDepositAC.schema";
// import { SalaryAC } from "../app/modules/SalaryAC/SalaryAC.schema";
// import { LoanAC } from "../app/modules/LoanAC/LoanAC.schema";
// import { BusinessAC } from "../app/modules/BusinessAC/BusinessAC.schema";

const getLastUserAccount = async (payload:string) => {
  if (payload === ENUM_Account_Type.SAVING){
  const lastAccountNo = await SavingAC.findOne()
    .sort({ createdAt: -1 })
    .lean();
  return lastAccountNo?.accountNo
    ? lastAccountNo?.accountNo.substring(3)
    : null;
  }else if (payload === ENUM_Account_Type.STAFF){
    const lastAccountNo = await StaffAC.findOne()
      .sort({ createdAt: -1 })
      .lean();
    return lastAccountNo?.accountNo
      ? lastAccountNo?.accountNo.substring(3)
      : null;
  // }else if (payload === ENUM_Account_Type.CURRENT){
  //   const lastAccountNo = await CurrentAC.findOne(
  //     { accountNo: 1, _id: 0 }
  //   )
  //   return lastAccountNo?.accountNo
  //     ? lastAccountNo?.accountNo.substring(3)
  //     : null;
  // }else if (payload === ENUM_Account_Type.FIXED){
  //   const lastAccountNo = await FixedDepositAC.findOne(
  //     { accountNo: 1, _id: 0 }
  //   )
  //   return lastAccountNo?.accountNo
  //     ? lastAccountNo?.accountNo.substring(3)
  //     : null;
  // }else if (payload === ENUM_Account_Type.SALARY){
  //   const lastAccountNo = await SalaryAC.findOne(
  //     { accountNo: 1, _id: 0 }
  //   )
  //   return lastAccountNo?.accountNo
  //     ? lastAccountNo?.accountNo.substring(3)
  //     : null;
  // } else if (payload === ENUM_Account_Type.LOAN){
  //   const lastAccountNo = await LoanAC.findOne(
  //     { accountNo: 1, _id: 0 }
  //   )
  //   return lastAccountNo?.accountNo
  //     ? lastAccountNo?.accountNo.substring(3)
  //     : null;
  // } else if (payload === ENUM_Account_Type.BUSINESS){
  //   const lastAccountNo = await BusinessAC.findOne(
  //     { accountNo: 1, _id: 0 }
  //   )
  //   return lastAccountNo?.accountNo
  //     ? lastAccountNo?.accountNo.substring(3)
  //     : null;
  }
};

const generateUserAccount = async (payload:string) => {
  const lastUserAccount: string =
    (await getLastUserAccount(payload)) || (0).toString().padStart(5, "0");
    
  const userId = payload+(parseInt(lastUserAccount) + 1).toString().padStart(5, "0");
  return userId;
};

export default generateUserAccount;