import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});

export const registerSchema = z.object({
    username: z.string().min(3, "Username måste vara minst 3 tecken"),
    password: z.string().min(6, "Password måste vara minst 6 tecken"),
});
