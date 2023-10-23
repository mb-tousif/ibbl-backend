import { Model } from "mongoose";

export type TUserRoles = "user" | "defaulter" | "premium_user";

export type TAccountType =
  | "Savings A/C"
  | "Current A/C"
  | "Salary A/C"
  | "Student A/C"
  | "Not Chosen"

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

export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;
