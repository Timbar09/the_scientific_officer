export type QuestionType = "multiple choice" | "true/false" | "detailed answer";

export interface PracticeData {
  questions: PracticeQuestion[];
}

export interface PracticeSettings {
  topics: string[];
  questionType: QuestionType;
  timePractice: boolean;
  practiceDuration: number;
  showHint: boolean;
}

export interface PracticeQuestionVariant {
  question: string;
  answer: string;
  explanation: string;
  hint?: string;
  options?: string[];
}

export interface PracticeQuestion {
  id: number;
  topics: string[];
  variants: Partial<Record<QuestionType, PracticeQuestionVariant>>;
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
