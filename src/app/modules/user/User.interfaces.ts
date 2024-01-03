import { Model } from "mongoose";

export type TUserRoles =
  | "user"
  | "defaulter"
  | "account_holder"
  | "admin"
  | "cashier"
  | "manager"
  | "CEO";

  export type TOtpPayload = {
    email: string;
    OTP: number;
  };

export type TUser = {
  _id?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  DOB: string;
  img?: string;
  accountNo?: string;
  contactNo: string;
  gender: string;
  OTP?: number;
  confirmedAccount?: boolean;
  role: TUserRoles;
  failedLoginAttempts: number;
  changePassword: boolean;
  NID: string;
  status?: string;
  address: string;
};

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
  accountNo?: string;
  contactNo?: string;
  NID?: string;
}