import { z } from "zod";

const dataValidation = z.object({
  body: z.object({
    totalUser: z.number().int().positive().optional(),
    totalAccountHolder: z.number().int().positive().optional(),
    totalInvestment: z.number().int().positive().optional(),
    totalCredit: z.number().int().positive().optional(),
    totalCapital: z.number().int().positive().optional(),
    totalProfit: z.number().int().positive().optional(),
    totalExpense: z.number().int().positive().optional(),
  }),
});

export const BankSummaryValidation = {
  dataValidation,
};
