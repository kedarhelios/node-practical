import { z } from "zod";

const createProductSchema = z.object(
    {
        body: z.object({
            name: z.string({
                invalid_type_error: "Product name must be a string",
                required_error: "Product name is required",
            }),
        }),
    },
    { message: "Payload must not be empty" }
);

const updateProductSchema = z.object(
    {
        body: z.object({
            name: z
                .string({
                    invalid_type_error: "Product name must be a string",
                    required_error: "Product name is required",
                })
                .min(1, { message: "Product name cannot be empty" }),
        }),
    },
    { message: "Payload must not be empty" }
);

export { createProductSchema, updateProductSchema };
