export type TAccountType =
  | "Savings A/C"
  | "Current A/C"
  | "Salary A/C"
  | "Student A/C"
  | "Not Chosen"
  | "Business A/C"
  | "Loan A/C"
  | "Fixed Deposit A/C"
  | "Staff A/C";

export enum ENUM_Account_Type {
  SAVING = "SVG",
  CURRENT = "CRT",
  FIXED = "FXD",
  SALARY = "SRY",
  STUDENT = "STD",
  BUSINESS = "BSN",
  LOAN = "LON",
  STAFF = "STF",
}

export const AccountTypeRef = [ "SavingsAC", "CurrentAC", "SalaryAC", "StudentAC", "NotChosen", "BusinessAC", "LoanAC", "FixedDepositAC", "StaffAC"];

export interface ICreateAccountPayload {
  id: string;
  accountType: TAccountType;
}
