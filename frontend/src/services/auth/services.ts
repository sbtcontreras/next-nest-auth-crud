import { apiClient } from "../api";
import { AuthData, LoginDTO, RegisterDTO, User } from "./schemas";

const AUTH_STORAGE_KEY = "auth";

const isTokenValid = (token: string): boolean => {
  const payload = token.split(".")[1];
  if (!payload) return false;
  const decodedPayload = JSON.parse(atob(payload));
  const exp = decodedPayload.exp;
  if (!exp) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
};

const storeAuthData = (authData: AuthData): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const retrieveAuthData = (): AuthData | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!data) return null;
  const parsedData = JSON.parse(data) as AuthData;
  if (!isTokenValid(parsedData.token)) {
    clearAuthData();
    return null;
  }
  return parsedData;
};

export const getCurrentToken = (): string | null => {
  return retrieveAuthData()?.token ?? null;
};

export const getCurrentUser = (): User | null => {
  return retrieveAuthData()?.user ?? null;
};

export const login = async (credentials: LoginDTO): Promise<void> => {
  try {
    const authData = await apiClient<AuthData>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    storeAuthData(authData);
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

export const register = async (credentials: RegisterDTO): Promise<void> => {
  try {
    const authData = await apiClient<AuthData>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    storeAuthData(authData);
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed");
  }
};

export const logout = (): void => {
  clearAuthData();
};
