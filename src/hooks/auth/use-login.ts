import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signIn } from "~/lib/auth-client";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const { error } = await signIn.email(data);
      if (error) throw new Error(error.message ?? "Invalid credentials");
    },
    onSuccess: () => navigate({ to: "/dashboard" }),
  });
}
