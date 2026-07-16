import apiClient from "./client";
import type { AuthResponse } from "../types";

export async function registerStudent(data: {
  email: string;
  password: string;
  fullName: string;
  institution: string;
}) {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function getMe() {
  const response = await apiClient.get("/auth/me");
  return response.data;
}
