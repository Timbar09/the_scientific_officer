import type { Session } from "../../../hooks/useSession/types";
import type { Question, UserAnswer } from "../types";

export interface PracticeSessionHeaderProps {
  isSessionComplete: boolean;
  displayHint: boolean;
  onRevealHint: (value: boolean) => void;
  settings: Session["settings"];
  questions: Session["questions"];
}

export interface OverviewProps {
  questions: Question[];
  userAnswers: Map<number, UserAnswer>;
}

export interface HintTextProps {
  enabled: boolean;
  isRevealed: boolean;
  text: string;
}

export interface AnswerBoxProps {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (option: string) => void;
  selectedOptionId: number | undefined;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface NavButtonsProps {
  onToggleAnswer: () => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
  submit: () => void;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  showAnswer: boolean;
  questions: Question[];
  allQuestionsAnswered: boolean;
}
