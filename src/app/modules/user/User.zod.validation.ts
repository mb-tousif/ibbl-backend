import { z } from "zod";

const managementPostValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    img: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
    accountType: z
      .enum([
        "Savings A/C",
        "Current A/C",
        "Salary A/C",
        "Business A/C",
        "Student A/C",
        "Staff A/C",
        "Loan A/C",
        "Fixed Deposit A/C",
      ])
      .optional(),
    accountNo: z.string().optional(),
    NID: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    contactNo: z
      .string({
        required_error: "Contact number is required",
      })
      .min(11)
      .max(20),
    name: z.object({
      firstName: z.string().min(2).max(20),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20),
    }),
    role: z.enum(["admin", "cashier", "manager", "CEO"]),
    address: z.string({
      required_error: "Address is required",
    }),
    balance: z.number().optional(),
    deposit: z.number().optional(),
    income: z.number().optional(),
    loan: z.number().optional(),
    savings: z.number().optional(),
  }),
});
const postValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    img: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
    accountType: z
      .enum([
        "Savings A/C",
        "Current A/C",
        "Salary A/C",
        "Business A/C",
        "Student A/C",
        "Loan A/C",
        "Fixed Deposit A/C",
      ])
      .optional(),
    accountNo: z.string().optional(),
    NID: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    contactNo: z
      .string({
        required_error: "Contact number is required",
      })
      .min(11)
      .max(20),
    name: z.object({
      firstName: z.string().min(2).max(20),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20),
    }),
    role: z
      .enum([
        "admin",
        "user",
        "cashier",
        "manager",
        "defaulter",
        "premium_user",
        "CEO",
      ])
      .optional(),
    address: z.string({
      required_error: "Address is required",
    }),
    balance: z.number().optional(),
    deposit: z.number().optional(),
    income: z.number().optional(),
    loan: z.number().optional(),
    savings: z.number().optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    email: z.string().email().optional(),
    img: z.string().optional(),
    password: z.string().min(6).optional(),
    accountType: z
      .enum(["Savings A/C", "Current A/C", "Salary A/C", "Student A/C"])
      .optional(),
    contactNo: z.string().min(11).max(15).optional(),
    name: z.object({
      firstName: z.string().min(2).max(20).optional(),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20).optional(),
    }),
    NID: z.string().optional(),
    role: z
      .enum([
        "admin",
        "user",
        "cashier",
        "manager",
        "defaulter",
        "premium_user",
        "CEO",
      ])
      .optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
    postValidation,
    updateValidation,
    managementPostValidation
}