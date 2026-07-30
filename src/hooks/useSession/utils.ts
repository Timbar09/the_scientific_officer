import type {
  Question,
  QuestionData,
  QuestionVariant,
  UserAnswer,
} from "../../pages/practice/types";

export const shuffle = (qs: Question[]): Question[] => {
  const shuffled = [...qs];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export const ensureTrueFalseOptions = (
  variant: QuestionVariant,
  key: string,
) =>
  key.toLowerCase() === "true/false" &&
  (!variant.options || !variant.options.length)
    ? { ...variant, options: ["True", "False"] }
    : variant;

export const getAvailableVariantKeys = (
  q: QuestionData,
  availableTypes: Set<string>,
): string[] =>
  Object.keys(q.variants).filter(
    (k) => availableTypes.size === 0 || availableTypes.has(k.toLowerCase()),
  );

export const pickRandomQuestion = (
  questions: Question[],
): Question | undefined => {
  if (!questions.length) return undefined;
  return questions[Math.floor(Math.random() * questions.length)];
};

export const getSessionQuestions = (
  questionList: Question[],
  selectedType: string | undefined,
): Question[] => {
  if (!questionList.length) return [];

  if (selectedType && selectedType.toLowerCase() !== "all") {
    return questionList.filter(
      (q) => q.variant.toLowerCase() === selectedType.toLowerCase(),
    );
  }

  return questionList;
};

export const destructureQuestionData = (
  questionData: QuestionData[],
  availableTypes: Set<string>,
): Question[] => {
  let uniqueIdCounter = 0;

  const destructuredQuestions = questionData.map((q) => {
    const { variants, ...rest } = q;

    const variantKeys = [...availableTypes];

    const qList = variantKeys.map((key) => {
      const questionVariant =
        variants[key as keyof typeof variants] ||
        variants[Object.keys(variants)[0] as keyof typeof variants];

      const result = {
        variant: key as keyof typeof variants,
        ...{ ...rest, id: uniqueIdCounter },
        ...questionVariant,
      };

      uniqueIdCounter += 1;

      return result;
    });

    return qList;
  });

  return shuffle(destructuredQuestions.flat());
};

export const getCurrentQuestion = (
  questions: Question[],
  currentIndex: number,
): Question | undefined => {
  if (!questions.length) return undefined;
  if (currentIndex < 0 || currentIndex >= questions.length) return undefined;
  return questions[currentIndex];
};

export const getAnswersWithCurrentSelection = (
  currentQuestion: Question | undefined,
  selectedAnswer: string,
  userAnswers: Map<number, UserAnswer>,
): Map<number, UserAnswer> => {
  const map = new Map(userAnswers);
  const { answer } = currentQuestion || {};

  if (currentQuestion && selectedAnswer && selectedAnswer !== "") {
    map.set(currentQuestion.id, {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: selectedAnswer === answer,
      correctAnswer: answer || "",
    });
  }
  return map;
};

export const getUnansweredQuestionIndexes = (
  questions: Question[],
  userAnswers: Map<number, UserAnswer>,
): number[] =>
  questions
    .map((q, i) => (userAnswers.has(q.id) ? -1 : i))
    .filter((i) => i !== -1);
