import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Please provide a valid email address.").min(1, "Email is required."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter.")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter.")
    .regex(/[0-9]/, "Password must contain atleast one number.")
    .regex(/^[a-zA-Z0-9]/, "Password must contain atleast one special character."),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores."),
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),
  email: z.email("Please provide a valid email address.").min(1, "Email is required."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter.")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter.")
    .regex(/[0-9]/, "Password must contain atleast one number.")
    .regex(/^[a-zA-Z0-9]/, "Password must contain atleast one special character."),
});
