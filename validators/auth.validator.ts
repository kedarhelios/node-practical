import { z } from "zod";

const loginSchema = z.object(
    {
        body: z.object({
            username: z.string({
                invalid_type_error: "Username must be a string",
                required_error: "Username is required",
            }),
            password: z.string({
                invalid_type_error: "Password must be a string",
                required_error: "Password is required",
            }),
        }),
    },
    { message: "Payload must not be empty" }
);

export { loginSchema };
