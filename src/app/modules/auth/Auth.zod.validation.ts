
import { z } from "zod";

const otpValidation = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email(),
        OTP: z.number({
            required_error: "OTP is required"
        })
    })
});

const postValidation = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email(),
        password: z.string({
            required_error: "Password is required"
        }).min(6),
    })
});

export const AuthValidation = {
    postValidation,
    otpValidation
}