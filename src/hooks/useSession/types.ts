import type {
  Question,
  SessionSettings,
  SessionResults,
  UserAnswer,
} from "../../pages/practice/types";

export interface Session {
  settings: SessionSettings | undefined;
  isComplete: boolean;
  results: SessionResults | null;
  revealedHintQuestionIds: Set<number>;
  questions: {
    list: Question[];
    unansweredCount: number;
    loading: boolean;
    areAllAnswered: boolean;
    current: {
      index: number;
      question: Question | undefined;
      selectedAnswer: string;
      showAnswer: boolean;
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
  userAnswers: Map<number, UserAnswer>;
}
