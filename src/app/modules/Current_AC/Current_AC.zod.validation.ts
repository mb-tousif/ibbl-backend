
import { z } from "zod";

const postValidation = z.object({
    body: z.object({

    })
});

const updateValidation = z.object({
    body: z.object({

    })
});

export const Current_ACValidation = {
    postValidation,
    updateValidation
}