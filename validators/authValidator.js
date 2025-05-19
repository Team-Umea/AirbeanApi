import { z } from "zod";

const loginSchema = z.object({
    username: z.string().min(1, "username is requiered"),
    password: z.string().min(6, "Password must be at least 6 chars"),

});

