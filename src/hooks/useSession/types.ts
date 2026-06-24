import type {
  // SessionData,
  Question,
  SessionSettings,
  QuestionVariant,
  SessionResults,
  // UserAnswer,
} from "../../pages/practice/types";

export interface Session {
  settings: SessionSettings | undefined;
  isLoading: boolean;
  isComplete: boolean;
  results: SessionResults | null;
  questions: Question[];
  filteredQuestions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question | undefined;
  currentVariant: QuestionVariant | undefined;
  showAnswer: boolean;
  isHintRevealed: boolean;
  selectedAnswer: string;
  unansweredCount: number;
  allQuestionsAnswered: boolean;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submit: () => void;
  setSelectedAnswer: (value: string) => void;
  toggleAnswer: () => void;
  revealHint: () => void;
  goToPractice: () => void;
}
