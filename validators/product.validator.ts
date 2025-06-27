import { z } from "zod";

const createProductSchema = z.object(
    {
        body: z.object({
            name: z.string({
                invalid_type_error: "Product name must be a string",
                required_error: "Product name is required",
            }),
            product_number: z.string({
                invalid_type_error: "Product number must be a string",
                required_error: "Product number is required",
            }),
            description: z.string({
                invalid_type_error: "Description must be a string",
                required_error: "Description is required",
            }),
            price: z
                .number({
                    invalid_type_error: "Price must be a number",
                    required_error: "Price is required",
                })
                .min(0, { message: "Price must be a positive number" }),
        }),
    },
    { message: "Payload must not be empty" }
);

export { createProductSchema };
