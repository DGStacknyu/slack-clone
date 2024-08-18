import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(2, { message: "Email must be 2 characters" }),
});
export const createWorkSpaceSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace name should be at least 2 characters long",
  }),
});
