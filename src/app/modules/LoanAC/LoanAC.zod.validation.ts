import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    totalLoan: z.number({
      required_error: "Total amount is required",
    }),
    duration: z.number({
      required_error: "Duration is required",
    }),
    company: z.string({
      required_error: "Company name is required",
    }),
    interestRate: z.number().optional(),
    withdrawAmount: z.number().optional(),
    depositAmount: z.number().optional(),
    maturityDate: z.string(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    interest: z.number().optional(),
    duration: z.number().optional(),
    depositAmount: z.number().optional(),
    withdrawAmount: z.number().optional(),
    maturityDate: z.string().optional(),
    company: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const LoanACValidation = {
  postValidation,
  updateValidation,
};
