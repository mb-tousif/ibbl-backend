
import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        userId : z.string({
            required_error: "User Id is required"
        }),
        accountNo : z.string({
            required_error: "Account No is required"
        }),
        totalBalance : z.number({
            required_error: "Total Balance is required"
        }),
        interest : z.number().optional(),
        depositAmount : z.number({
            required_error: "Deposit Amount is required"
        }),
        maturityDate : z.string().optional(),
    })
});

const updateValidation = z.object({
    body: z.object({
        totalBalance : z.number().optional(),
        interest : z.number().optional(),
        depositAmount : z.number().optional(),
        maturityDate : z.string().optional(),
    })
});

export const SavingACValidation = {
    postValidation,
    updateValidation
}