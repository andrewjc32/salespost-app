import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, {}).max(255),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }).max(255)
  .refine(
    (value) => /[A-Z]/.test(value),
    { message: "Password must contain at least one uppercase letter" }
  )
  .refine(
    (value) => /[a-z]/.test(value),
    { message: "Password must contain at least one lowercase letter" }
  )
  .refine(
    (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    { message: "Password must contain at least one symbol" }
  )
});

export type SignUpSchema = z.infer<typeof signUpSchema>;