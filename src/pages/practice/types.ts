export const VARIANT_NAMES = [
  "multiple choice",
  "true/false",
  "short answer",
  "detailed answer",
] as const;

export type QuestionTypeName = (typeof VARIANT_NAMES)[number];

export type QuestionType = {
  id: number;
  name: QuestionTypeName;
  icon: string;
  available: boolean;
  description: string;
};

export interface QuestionVariant {
  question: string;
  answer: string;
  explanation: string;
  hint?: string;
  options?: string[];
}

export interface QuestionData {
  id: number;
  topics: string[];
  difficulty: "easy" | "medium" | "hard";
  variants: Record<QuestionTypeName, QuestionVariant>;
}

export interface QuestionsPayload {
  meta?: Record<string, string>;
  questionTypes?: QuestionType[];
  questions?: QuestionData[];
}

export interface SessionData {
  questions: QuestionData[];
}

export interface SessionSettings {
  topics: string[];
  questionType: string;
  timerEnabled: boolean;
  sessionDuration: number;
  hintsEnabled: boolean;
}

// Track user's answer for each question
export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

// Results summary after session completes
export interface SessionResults {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: UserAnswer[];
  score: number;
}
