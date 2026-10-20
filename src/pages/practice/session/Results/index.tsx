import type { SessionResults, Question } from "../../types";

import Summary from "./Summary";
import ReviewWrongAnswers from "./ReviewWrongAnswers";

interface Props {
  sessionResults: SessionResults;
  questions: Question[];
}

const PracticeResults = ({ sessionResults, questions }: Props) => {
  const { wrongAnswers } = sessionResults;

  return (
    <div className="practice__results grid gap-4 m-block-start-4">
      <Summary {...sessionResults} />

      <ReviewWrongAnswers wrongAnswers={wrongAnswers} questions={questions} />

      {sessionResults.score === 100 && <PerfectScoreGif />}
    </div>
  );
};

const PerfectScoreGif = () => {
  const gifs = [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazR3czExZTR6bjF2bWhuaWZyOHJjdGZ3MDcxZ3RtNXNyN2pqYnlrayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BPJmthQ3YRwD6QqcVD/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG91aHo2aTVhdmg5Z3d0YW51Z3VjcWpzbDBtMGN3b3NnM3FmcTQ2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11sBLVxNs7v6WA/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDVkbHlrdGl6Y3dtY3ZtNnVscmVzaWZ1bzV6NnFhczc3a2VocXk2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q9FGOQewX92eRRO9Qi/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHIxZXZxM2l1NnU3ajFkeDYzbDdkcWE5ZjIzazlqczN3ZDA0YTlpdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ujTVMASREzuRbH6zy5/giphy.gif",
  ];

  const randomIndex = Math.floor(Math.random() * gifs.length);
  return (
    <div className="practice__results--perfectScoreGif flex ai-center jc-center m-block-start-4">
      <img src={gifs[randomIndex]} alt="Perfect Score" />
    </div>
  );
};

export default PracticeResults;
