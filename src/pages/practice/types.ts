export const QUESTION_TYPE_NAMES = [
  "Multiple Choice",
  "True/False",
  "Short Answer",
  "Detailed Answer",
] as const;

export type QuestionTypeName = (typeof QUESTION_TYPE_NAMES)[number];

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

export interface Question {
  id: number;
  topics: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  variants: Record<QuestionTypeName, QuestionVariant>;
}

export interface QuestionsPayload {
  meta?: Record<string, string>;
  questionTypes?: QuestionType[];
  questions?: Question[];
}

export interface SessionData {
  questions: Question[];
}

export interface SessionSettings {
  topics: string[];
  questionType: QuestionTypeName;
  timePractice: boolean;
  practiceDuration: number;
  showHint: boolean;
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
