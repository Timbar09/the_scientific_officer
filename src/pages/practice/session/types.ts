import type { Session } from "../../../hooks/useSession/types";
import type { Question, UserAnswer } from "../types";
import type { Swiper as SwiperType } from "swiper";

export interface PracticeSessionHeaderProps {
  isSessionComplete: boolean;
  displayHint: boolean;
  onRevealHint: (value: boolean) => void;
  settings: Session["settings"];
  questions: Session["questions"];
}

export interface OverviewProps {
  position?: "top" | "right";
  questions: Question[];
  userAnswers: Map<number, UserAnswer>;
  questionNum: number;
  setCurrentQuestionIndex: (index: number) => void;
  questionCardRef?: React.RefObject<HTMLElement>;
}

export interface TopOverviewProps extends OverviewProps {
  swiperInstance: SwiperType | null;
  setSwiperInstance: React.Dispatch<React.SetStateAction<SwiperType | null>>;
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
