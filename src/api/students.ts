import apiClient from "./client";
import type { StudentProfile } from "../types";

export async function getMyProfile(): Promise<StudentProfile> {
  const response = await apiClient.get("/students/me/profile");
  return response.data;
}
