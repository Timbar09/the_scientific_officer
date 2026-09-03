import type {
  Question,
  SessionSettings,
  SessionResults,
  UserAnswer,
} from "../../pages/practice/types";

export interface Session {
  settings: SessionSettings | undefined;
  isSubmitted: boolean;
  results: SessionResults | null;
  revealedHintQuestionIds: Set<number>;
  questions: SessionQuestionData;
  func: SessionFunc;
  userAnswers: Map<number, UserAnswer>;
}

export interface SessionQuestionData {
  list: Question[];
  count: number;
  unansweredCount: number;
  loading: boolean;
  areAllAnswered: boolean;
  current: SessionQuestionCurrent;
}

export interface SessionQuestionCurrent {
  index: number;
  question: Question | undefined;
  selectedAnswer: string;
  showAnswer: boolean;
}

export interface SessionFunc {
  onSelectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submit: () => void;
  toggleAnswer: () => void;
  revealHint: () => void;
  jumpToQuestion: (index: number) => void;
  goToPractice: () => void;
}
