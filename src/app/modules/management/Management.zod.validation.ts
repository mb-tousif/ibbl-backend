
import { z } from "zod";

const postValidation = z.object({
    body: z.object({

    })
});

const updateValidation = z.object({
    body: z.object({

    })
});

export const ManagementValidation = {
    postValidation,
    updateValidation
}