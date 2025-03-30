import { useEffect, useState } from "react";
import { getCurrentUser } from "./services";
import { User } from "./schemas";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    updateUser();
    setIsLoading(false);

    const handleStorageChange = (event: StorageEvent) =>
      event.key === "auth" && updateUser();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
  };
}
