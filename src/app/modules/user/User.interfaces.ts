import { Model } from "mongoose";

export type TUserRoles = "user" | "admin" | "cashier" | "manager" | "defaulter" | "premium_user";

export type TAccountType =
  | "Savings A/C"
  | "Current A/C"
  | "Salary A/C"
  | "Student A/C";

export type TUser = {
  id: string;
  email: string;
  password: string;
  img: string;
  accountType?: TAccountType;
  accountNo?: string;
  contactNo: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  OTP?: number;
  confirmedAccount?: boolean;
  role: TUserRoles;
  status?: string;
  address: string;
  balance?: number;
  deposit?: number;
  income?: number;
  loan?: number;
  savings?: number;
};

export type UserModel = Model<TUser, Record<string, unknown>>;
