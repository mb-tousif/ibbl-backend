import { z } from "zod";

const otpValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    OTP: z.number({
      required_error: "OTP is required",
    }),
  }),
});

const loginValidation = z.object({
  body: z.object({
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
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
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
    OTP: z
      .number({
        required_error: "OTP is required",
      })
      .min(6),
  }),
});

export const AuthValidation = {
  loginValidation,
  otpValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
};