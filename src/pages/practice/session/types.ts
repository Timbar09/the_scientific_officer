// import type { UserAnswer } from "../../../pages/practice/types";

export interface AnswerBoxProps {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (option: string) => void;
  selectedOptionId: number | undefined;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  // userAnswer: UserAnswer | undefined;
}
