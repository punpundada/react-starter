import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Please enter Username/LoginId" })
    .nonempty("Please enter Username/LoginId"),
  password: z
    .string({ required_error: "Please enter Password" })
    .nonempty("Please enter Password")
    .min(8, "Password must be at lease 8 characters"),
});

export type LoginScehemaType = z.TypeOf<typeof LoginSchema>;
