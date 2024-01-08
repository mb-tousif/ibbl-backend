
import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    totalBalance: z.number({
      required_error: "Total Balance is required",
    }),
    interest: z.number().optional(),
    withdrawAmount: z.number().optional(),
    depositAmount: z.number({
      required_error: "Deposit Amount is required",
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    totalBalance: z.number().optional(),
    interest: z.number().optional(),
    depositAmount: z.number().optional(),
    withdrawAmount: z.number().optional(),
    company: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const CurrentACValidation = {
  postValidation,
  updateValidation,
};