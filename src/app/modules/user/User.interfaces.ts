import { Model } from "mongoose";

export type TUserRoles = "user" | "defaulter" | "premium_user" | "admin" | "cashier" | "manager" | "CEO"

export type TAccountType =
  | "Savings A/C"
  | "Current A/C"
  | "Salary A/C"
  | "Student A/C"
  | "Not Chosen"
  | "Business A/C"
  | "Loan A/C"
  | "Fixed Deposit A/C"
  | "Staff A/C"

  export type TOtpPayload = {
    email: string;
    OTP: number;
  };

export type TUser = {
  id: string;
  email: string;
  password: string;
  img?: string;
  accountType?: TAccountType;
  accountNo?: string;
  contactNo: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: string;
  OTP?: number;
  confirmedAccount?: boolean;
  role: TUserRoles;
  NID: string;
  status?: string;
  address: string;
  balance?: number;
  deposit?: number;
  income?: number;
  loan?: number;
  savings?: number;
};

export interface ICreateAccountPayload {
  id: string;
  accountType: TAccountType;
}

export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;


export type TUserFilterableFields = {
  search?: string;
  role?: TUserRoles;
  status?: string;
  email?: string;
  accountType?: TAccountType;
  accountNo?: string;
  contactNo?: string;
  NID?: string;
}