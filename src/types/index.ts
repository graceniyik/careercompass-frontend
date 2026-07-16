export type Role = "STUDENT" | "COUNSELOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  institution: string;
  yearOfStudy?: string;
  fieldOfStudy?: string;
  hobbies?: string;
  careerGoals?: string;
  strengths?: string;
  skills: { skill: { id: string; name: string } }[];
}

export interface AssessmentQuestion {
  id: string;
  type: "LIKERT" | "QUALITATIVE";
  text: string;
  riasecDimension?: string;
  order: number;
}

export interface RiasecScores {
  REALISTIC: number;
  INVESTIGATIVE: number;
  ARTISTIC: number;
  SOCIAL: number;
  ENTERPRISING: number;
  CONVENTIONAL: number;
  [key: string]: number;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  riasecCode: RiasecScores;
  isActive: boolean;
  requiredSkills?: { skill: { id: string; name: string } }[];
}

export interface Recommendation {
  id: string;
  matchScore: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  aiExplanation?: string;
  aiRoadmapText?: string;
  career: Career;
}

export interface Assessment {
  id: string;
  submittedAt: string;
  riasecScores: RiasecScores;
  recommendations?: Recommendation[];
}
