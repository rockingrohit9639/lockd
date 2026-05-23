import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signUp } from "~/lib/auth-client";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { error } = await signUp.email(data);
      if (error) throw new Error(error.message ?? "Something went wrong");
    },
    onSuccess: () => navigate({ to: "/build" }),
  });
}
