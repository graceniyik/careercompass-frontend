import apiClient from "./client";
import type { Assessment, AssessmentQuestion } from "../types";

export async function getQuestions(): Promise<AssessmentQuestion[]> {
  const response = await apiClient.get("/assessments/questions");
  return response.data;
}

export interface AnswerInput {
  questionId: string;
  likertValue?: number;
  textAnswer?: string;
}

export async function submitAssessment(
  answers: AnswerInput[],
): Promise<Assessment> {
  const response = await apiClient.post("/assessments", { answers });
  return response.data;
}

export async function getAssessmentHistory(): Promise<Assessment[]> {
  const response = await apiClient.get("/assessments/history");
  return response.data;
}

export async function getAssessmentById(id: string): Promise<Assessment> {
  const response = await apiClient.get(`/assessments/${id}`);
  return response.data;
}
