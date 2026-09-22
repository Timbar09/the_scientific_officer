import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import type { SessionResults, Question } from "../../types";

import Icon from "../../../../components/Icon";

interface WrongAnswersProps {
  wrongAnswers: SessionResults["wrongAnswers"];
  questions: Question[];
}

const ReviewWrongAnswers = ({ wrongAnswers, questions }: WrongAnswersProps) => {
  const getWrongQuestion = (wrongAnswer: SessionResults["wrongAnswers"][0]) => {
    return questions.find((q) => q.id === wrongAnswer.questionId);
  };

  if (wrongAnswers.length === 0) {
    return null;
  }

  return (
    <section className="practice__results--wrongAnswer">
      <h3 className="text-xl m-block-end-4 m-block-start-2">
        Review Wrong Answers
      </h3>

      <ul className="practice__results--wrongAnswer__list flex flex-col gap-1">
        {wrongAnswers.map((wrongAnswer) => {
          const question = getWrongQuestion(wrongAnswer);

          return (
            question && (
              <WrongAnswerItem
                key={wrongAnswer.questionId}
                wrongAnswer={wrongAnswer}
                question={question}
              />
            )
          );
        })}
      </ul>
    </section>
  );
};

const WrongAnswerItem = ({
  wrongAnswer,
  question,
}: {
  wrongAnswer: SessionResults["wrongAnswers"][0];
  question: Question;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openClass = isOpen ? "open" : "closed";

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const animationProps = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.25 },
  };

  const baseCN = "practice__results--wrongAnswer__item";
  const numberClass = `${baseCN}--number flex jc-between ai-center gap-2 p-3 ${openClass}`;
  const numberValueClass = `${baseCN}--number__value text-lg`;
  const iconClass = `${baseCN}--number__icon p-1 flex ai-center`;
  const explanationClass = `${baseCN}--explanation p-block-end-4 p-inline-4`;
  const explanationContainerClass = `${baseCN}--explanation__container p-block-3 p-inline-3`;
  const correctAnswerClass = `${baseCN}--explanation__correct flex flex-col flex-@sm-row gap-2`;

  return (
    <li className={baseCN}>
      <div onClick={onClick} className={numberClass}>
        <p className={numberValueClass}>Question {wrongAnswer.questionNum}</p>

        <span className={iconClass}>
          <Icon name="keyboard_arrow_down" />
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div {...animationProps} className={explanationClass}>
            <div className={explanationContainerClass}>
              <p className="p-block-end-2">{question.text}</p>

              <p>
                <strong>Your Answer:</strong> {wrongAnswer.selectedAnswer}
              </p>

              <div className={correctAnswerClass}>
                <strong>Correct Answer:</strong>{" "}
                <span className="flex flex-col gap-1">
                  <span>{wrongAnswer.correctAnswer}.</span>{" "}
                  <span>{question.explanation}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default ReviewWrongAnswers;
