import { envConfig } from "@/config";
import { authService } from "../auth/services";

export async function apiClient<T>(
  endpoint: string,
  { method, headers, ...customConfig }: RequestInit = {}
) {
  const token = authService.getCurrentToken();

  const config: RequestInit = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
    ...customConfig,
  };

  const response = await fetch(`${envConfig.apiUrl}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
