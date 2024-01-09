import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is required",
    }),
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
    loanAmount: z.number().optional(),
    paidAmount: z.number().optional(),
    maturityDate: z.string(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    interest: z.number().optional(),
    duration: z.number().optional(),
    loanAmount: z.number().optional(),
    paidAmount: z.number().optional(),
    maturityDate: z.string().optional(),
    company: z.string().optional(),
    status: z.string().optional(),
  }),
});

const instalmentValidation = z.object({
  body: z.object({
    paidAmount: z.number({
      required_error: "Paid amount is required",
    }),
  }),
});

export const LoanACValidation = {
  postValidation,
  updateValidation,
  instalmentValidation,
};
