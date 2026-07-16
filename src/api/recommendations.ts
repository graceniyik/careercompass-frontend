import apiClient from "./client";

export async function askAboutRecommendation(
  recommendationId: string,
  question: string,
): Promise<{ answer: string }> {
  const response = await apiClient.post(
    `/recommendations/${recommendationId}/ask`,
    {
      question,
    },
  );
  return response.data;
}
