import { z } from "zod";

const createUserSchema = z.object(
    {
        body: z.object({
            name: z.string({
                invalid_type_error: "Name must be a string",
                required_error: "Name is required",
            }),
            username: z.string({
                invalid_type_error: "Username must be a string",
                required_error: "Username is required",
            }),
            password: z
                .string({
                    invalid_type_error: "Password must be a string",
                    required_error: "Password is required",
                })
                .min(6, { message: "Password must be atleast 6 characters" })
                .max(20, {
                    message: "Password must be less than 20 characters",
                }),
        }),
    },
    { message: "Payload must not be empty" }
);

export { createUserSchema };
