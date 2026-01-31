import { axisInstance } from "@/lib/constants";
import { LoginResponse } from "@/type/auth/auth";

type LoginServiceParams = {
  username: string;
  password: string;
};
export async function loginService(params: LoginServiceParams) {
  const res = await axisInstance.post<LoginResponse>("login", params);
  return res.data;
}
