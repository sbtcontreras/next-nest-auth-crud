import { useRouter } from "next/navigation";
import { useAuth } from "./context";
import { useEffect } from "react";

export const useUserMustBeLogged = (redirectTo = "/auth/login") => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push(redirectTo);
    }
  }, [auth.isAuthenticated, auth.isLoading, redirectTo, router]);

  return auth;
};

export const useUserMustBeLoggedOut = (redirectTo = "/") => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      router.push(redirectTo);
    }
  }, [auth.isAuthenticated, auth.isLoading, redirectTo, router]);

  return auth;
};
