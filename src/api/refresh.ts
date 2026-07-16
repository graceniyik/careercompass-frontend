import axios from "axios";
import type { AuthResponse } from "../types";

// Separate, bare axios instance — deliberately bypasses our normal apiClient
// interceptor, so refreshing never accidentally attaches an expired access token.
export async function refreshTokens(
  refreshToken: string,
): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refreshToken },
  );
  return response.data;
}
