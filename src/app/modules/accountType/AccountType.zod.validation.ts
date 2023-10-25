
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        userId : z.string({
            required_error: "User Id is required"
        }).uuid(),
        email: z.string({
            required_error: "Email is required"
        }).email(),
        accountType: z.enum(["Savings A/C", "Current A/C", "Salary A/C", "Business A/C", "Student A/C"],{
            required_error: "Account Type is required"
        }),
        accountNo: z.string({
            required_error: "Account Number is required"
        }),
        balance: z.number({
            required_error: "Balance is required"
        }),
    })
});

const updateValidation = z.object({
    body: z.object({
        userId: z.string().uuid().optional(),
        email: z.string().email().optional(),
        accountType: z.enum(["Savings A/C", "Current A/C", "Salary A/C", "Business A/C", "Student A/C"]).optional(),
        accountNo: z.string().optional(),
        balance: z.number().optional(),
    })
});

export const AccountTypeValidation = {
    postValidation,
    updateValidation
}