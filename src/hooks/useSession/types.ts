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
    count: number;
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
    onSelectAnswer: (answer: string) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    submit: () => void;
    toggleAnswer: () => void;
    revealHint: () => void;
    setCurrentQuestionIndex: (index: number) => void;
    goToPractice: () => void;
  };
  userAnswers: Map<number, UserAnswer>;
}
