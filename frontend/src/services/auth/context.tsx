"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "./services";
import { LoginDTO, RegisterDTO, JWTPayload } from "./dto";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextValue {
  user: JWTPayload | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (credentials: RegisterDTO) => Promise<void>;
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const updateUser = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    updateUser();
    setIsLoading(false);
  }, []);

  const handleRegister = async (credentials: RegisterDTO) => {
    await authService.register(credentials);
    updateUser();
  };

  const handleLogin = async (credentials: LoginDTO) => {
    await authService.login(credentials);
    updateUser();
  };

  const handleLogout = () => {
    authService.logout();
    queryClient.clear();
    updateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
