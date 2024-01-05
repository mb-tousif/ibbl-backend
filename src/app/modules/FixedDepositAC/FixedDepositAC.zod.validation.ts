
import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User Id is required",
    }),
    totalBalance: z.number({
      required_error: "Total Balance is required",
    }),
    duration: z.number({
        required_error: "Duration is required",
    }),
    interest: z.number().optional(),
    depositAmount: z.number({
      required_error: "Deposit Amount is required",
    }),
    maturityDate: z.string(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    totalBalance: z.number().optional(),
    interest: z.number().optional(),
    duration: z.number().optional(),
    depositAmount: z.number().optional(),
    withdrawAmount: z.number().optional(),
    maturityDate: z.string().optional(),
  }),
});

export const FixedDepositACValidation = {
  postValidation,
  updateValidation,
};