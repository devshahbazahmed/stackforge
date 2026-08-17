import * as z from "zod";

export const SignInSchema = z.object({
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

export const SignUpSchema = z.object({
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

export const AskQuestionSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100, "Title cannot exceed 100 characters."),
  content: z.string().min(1, "Body is required."),
  tags: z
    .array(z.string().min(1, "Tag is required.").max(30, "Tag cannot exceed 30 characters."))
    .min(1, "Atleast 1 tag is required.")
    .max(3, "Cannot add more than 3 tags."),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores."),
  email: z.email("Please provide a valid email address.").min(1, "Email is required."),
  bio: z.string().optional(),
  image: z.string().url("Please provide valid URL.").optional(),
  location: z.string().optional(),
  portfolio: z.string().url("Please provide valid URL.").optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  name: z.string().min(1, "Name is required."),
  image: z.string().url("Please provide valid URL.").optional(),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter.")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter.")
    .regex(/[0-9]/, "Password must contain atleast one number.")
    .regex(/^[a-zA-Z0-9]/, "Password must contain atleast one special character.")
    .optional(),
  provider: z.string().min(1, "Provider is required."),
  providerAccountId: z.string().min(1, "Provider Account ID is required."),
});
