import type {
  Session,
  SessionQuestionData,
} from "../../../hooks/useSession/types";
import type { Question, UserAnswer } from "../types";
import type { Swiper as SwiperType } from "swiper";

export interface PracticeSessionHeaderProps {
  isSessionComplete: boolean;
  displayHint: boolean;
  onRevealHint: (value: boolean) => void;
  settings: Session["settings"];
  questions: SessionQuestionData;
  submit: () => void;
}

export interface OverviewProps {
  position?: "top" | "right";
  questions: Question[];
  userAnswers: Map<number, UserAnswer>;
  questionNum: number;
  jumpToQuestion: (index: number) => void;
  questionCardRef?: React.RefObject<HTMLElement>;
  swiperInstance: SwiperType | null;
  setSwiperInstance: React.Dispatch<React.SetStateAction<SwiperType | null>>;
  reset: () => void;
}

export interface RightOverviewProps {
  questions: Question[];
  userAnswers: Map<number, UserAnswer>;
  questionNum: number;
  jumpToQuestion: (index: number) => void;
  questionCardRef?: React.RefObject<HTMLElement>;
  reset: () => void;
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
  toggleAnswer: () => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
  submit: () => void;
  showAnswer: boolean;
  displayNav: boolean;
  allQuestionsAnswered: boolean;
  hideShowAnswerButton: boolean;
  reset: () => void;
  swiperInstance: SwiperType | null;
}
