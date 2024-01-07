import { z } from "zod";

const postValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    receiverId: z.string({
      required_error: "ReceiverId is required",
    }),
    amount: z
      .number({
        required_error: "Amount is required",
      })
      .positive(),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    receiverId: z.string().optional(),
    amount: z.number().positive().optional(),
    description: z.string().optional(),
  }),
});

export const TransactionValidation = {
  postValidation,
  updateValidation,
};
