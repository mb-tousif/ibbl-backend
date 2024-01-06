export type TAccountType =
  | "Savings A/C"
  | "Current A/C"
  | "Loan A/C"
  | "Staff A/C";

export enum ENUM_Account_Type {
  SAVING = "SVG",
  CURRENT = "CRT",
  LOAN = "LON",
  STAFF = "STF",
}

export const AccountTypeRef = [ "SavingsAC", "CurrentAC","LoanAC","StaffAC"];

export interface ICreateAccountPayload {
  id: string;
  accountType: TAccountType;
}
