import { z } from "zod";

const postValidation = z.object({
  body: z.object({
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
    interest: z.number().optional(),
    duration: z.number().optional(),
    maturityDate: z.string().optional(),
  }),
});

const withdrawValidation = z.object({
  body: z.object({
    withdrawAmount: z.number({
      required_error: "Withdraw amount is required",
    }),
  }),
});

export const SavingACValidation = {
  postValidation,
  updateValidation,
  withdrawValidation,
};