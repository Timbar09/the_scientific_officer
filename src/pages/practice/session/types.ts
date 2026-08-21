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
  questionNum: number;
  setCurrentQuestionIndex: (index: number) => void;
}

export interface InfoCardProps {
  display: boolean;
  classPrefix?: string;
  icon?: string;
  text: string;
}

export interface AnswerBoxProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelect: (option: string) => void;
  selectedOptionId: number | undefined;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowAnswerButton: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswer: boolean;
}

export interface NavButtonsProps {
  onToggleAnswer: () => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
  submit: () => void;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  showAnswer: boolean;
  displayNav: boolean;
  allQuestionsAnswered: boolean;
  hideShowAnswerButton: boolean;
  setShowAnswerButton: React.Dispatch<React.SetStateAction<boolean>>;
}
