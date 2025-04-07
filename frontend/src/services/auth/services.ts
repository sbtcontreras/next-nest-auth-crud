import { apiClient } from "../api/client";
import { AuthData, LoginDTO, RegisterDTO } from "./dto";

// Constants
const AUTH_STORAGE_KEY = "auth";

// Token utilities
const decodeTokenPayload = (token: string) => {
  const payload = token.split(".")[1];
  if (!payload) return null;
  return JSON.parse(atob(payload));
};

const isTokenValid = (token: string) => {
  try {
    const decoded = decodeTokenPayload(token);
    if (!decoded?.exp) return false;
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

// Storage utilities
const storeAuthData = (authData: AuthData) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const retrieveAuthData = () => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;

    const parsedData = JSON.parse(data) as AuthData;
    if (!isTokenValid(parsedData.token)) {
      clearAuthData();
      return null;
    }
    return parsedData;
  } catch {
    return null;
  }
};

// Auth service
export const authService = {
  getCurrentToken: () => retrieveAuthData()?.token ?? null,

  getCurrentUser: () => retrieveAuthData()?.user ?? null,

  login: async (credentials: LoginDTO) => {
    const authData = await apiClient<AuthData>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    storeAuthData(authData);
  },

  register: async (credentials: RegisterDTO) => {
    const authData = await apiClient<AuthData>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    storeAuthData(authData);
  },

  logout: () => {
    clearAuthData();
  },
};
