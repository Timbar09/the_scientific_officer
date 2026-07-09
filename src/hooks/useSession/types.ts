import type {
  // SessionData,
  QuestionData,
  SessionSettings,
  QuestionVariant,
  SessionResults,
  // UserAnswer,
} from "../../pages/practice/types";

export interface Session {
  settings: SessionSettings | undefined;
  isComplete: boolean;
  results: SessionResults | null;
  questions: {
    list: QuestionData[];
    engaged: Map<number, object>;
    unansweredCount: number;
    loading: boolean;
    areAllAnswered: boolean;
    current: {
      index: number;
      question: QuestionData | undefined;
      variant: QuestionVariant | undefined;
      selectedAnswer: string;
      showAnswer: boolean;
      hintRevealed: boolean;
    };
  };
  func: {
    nextQuestion: () => void;
    previousQuestion: () => void;
    submit: () => void;
    setSelectedAnswer: (value: string) => void;
    toggleAnswer: () => void;
    revealHint: () => void;
    goToPractice: () => void;
  };
}
