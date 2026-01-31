import { loginService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: loginService,
  });
}
