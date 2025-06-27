import { z } from "zod";

export const userPersonalInfoSchema = z.object({
    name: z.string().min(1, { message: "What's your name?" }),
    email: z.string().email({ message: "Please enter a valid email." }),
    birthMonth: z.string({ required_error: "Please select a month." }).min(1, "Please select a month."),
    birthDay: z.string({ required_error: "Please select a day." }).min(1, "Please select a day."),
    birthYear: z.string({ required_error: "Please select a year." }).min(4, "Please select a year."),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 digits.",
  }),
});

export const createPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters." })
        .refine((value) => /[a-z]/.test(value), {
            message: "Password must contain at least one lowercase letter.",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter.",
        })
        .refine((value) => /\d/.test(value), {
            message: "Password must contain at least one number.",
        })
        .refine((value) => /[@$!%*?&]/.test(value), {
            message: "Password must contain at least one special character.",
        }),
})