import Topics from "./Topics";
import InfoCard from "./InfoCard";

import type { QuestionHeaderProps } from "../types";

const Header = ({
  questionNumber,
  questionCount,
  topicList,
  questionText,
  displayHint,
  hintText,
}: QuestionHeaderProps) => {
  return (
    <header className="practice__session--question__header p-5">
      <div className="flex gap-2 ai-center">
        <p className="practice__session--question__number">
          Question {questionNumber} of {questionCount}
        </p>

        <Topics list={topicList} />
      </div>

      <h2 className="practice__session--question__text m-block-start-2">
        {questionText}
      </h2>

      <InfoCard
        display={displayHint}
        classPrefix="hint"
        icon="lightbulb_2"
        text={hintText || ""}
      />
    </header>
  );
};

export default Header;
