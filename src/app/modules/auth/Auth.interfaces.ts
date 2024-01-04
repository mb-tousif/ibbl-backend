export type TLoginData = {
    email: string;
    password: string;
};

export type TResetPassword = {
    email: string;
    password: string;
    OTP: string;
};