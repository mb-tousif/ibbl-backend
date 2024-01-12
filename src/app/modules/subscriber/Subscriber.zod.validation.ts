import { z } from "zod";

const postValidation = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
        }).email(),
    })
});

export const SubscriberValidation = {
    postValidation,
}