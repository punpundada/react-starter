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

export type LoginResponse = {
  message: string;
  username: string;
  name: string;
  stationCode: string;
  rank: string;
  department: string;
  roles: string[];
  access_token: string;
  token_type: string;
};

export type UserType = {
  username: string;
  name: string;
  stationCode: string;
  rank: string;
  department: string;
  roles: string[];
  selectedRole:string;
};
