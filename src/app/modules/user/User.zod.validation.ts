import { z } from "zod";

const managementPostValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(2).max(20),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20),
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
    img: z.string().optional(),
    DOB: z.string().optional(),
    NID: z.string().optional(),
    accountNo: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    contactNo: z
      .string({
        required_error: "Contact number is required",
      })
      .min(8)
      .max(20),
    role: z.enum(["admin", "cashier", "manager", "CEO"]),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const postValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(2).max(20),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20),
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6),
    img: z.string().optional(),
    DOB: z.string().optional(),
    NID: z.string().optional(),
    accountNo: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    contactNo: z
      .string({
        required_error: "Contact number is required",
      })
      .min(8)
      .max(20),
    role: z.enum(["user", "defaulter", "account_holder"]).optional(),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const userUpdateValidation = z.object({
  body: z.object({
    email: z.string().email().optional(),
    img: z.string().optional(),
    contactNo: z.string().min(11).max(15).optional(),
    name: z.object({
      firstName: z.string().min(2).max(20).optional(),
      middleName: z.string().optional(),
      lastName: z.string().min(2).max(20).optional(),
    }).optional(),
    NID: z.string().optional(),
    address: z.string().optional(),
  }),
});

const openAccountValidation = z.object({
  accountNo: z.string().optional(),
  accountType: z
    .enum([
      "Savings A/C",
      "Current A/C",
      "Salary A/C",
      "Student A/C",
      "Business A/C",
      "Staff A/C",
      "Loan A/C",
      "Fixed Deposit A/C",
    ])
    .optional(),
  role: z
    .enum([
      "admin",
      "user",
      "cashier",
      "account_holder",
      "manager",
      "defaulter",
      "CEO",
    ])
    .optional(),
});

const adminUpdateValidation = z.object({
  body: z.object({
    accountType: z
      .enum([
        "Savings A/C",
        "Current A/C",
        "Salary A/C",
        "Student A/C",
        "Business A/C",
        "Staff A/C",
        "Loan A/C",
        "Fixed Deposit A/C",
      ])
      .optional(),
    role: z
      .enum([
        "admin",
        "user",
        "cashier",
        "account_holder",
        "manager",
        "defaulter",
        "CEO",
      ])
      .optional(),
    status: z.enum(["Active", "Inactive", "Pending", "Blocked"]).optional(),
    balance: z.number().optional(),
    deposit: z.number().optional(),
    income: z.number().optional(),
    loan: z.number().optional(),
    savings: z.number().optional(),
  }),
});

export const UserValidation = {
  postValidation,
  userUpdateValidation,
  adminUpdateValidation,
  managementPostValidation,
  openAccountValidation,
};
