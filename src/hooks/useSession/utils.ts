import type {
  Question,
  UserAnswer,
  QuestionType,
  QuestionData,
  QuestionVariant,
  SessionSettings,
} from "../../pages/practice/types";

import { processOptions, shuffle } from "../../utils";

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
  settings: SessionSettings,
): Question[] => {
  if (!questionList.length) return [];

  const { questionType, topics } = settings;

  return questionList
    .filter(
      (q) =>
        !topics?.length || q.topics.some((topic) => topics.includes(topic)),
    )
    .filter(
      (q) =>
        !questionType ||
        questionType.toLowerCase() === "all-types" ||
        q.variant.toLowerCase() === questionType.toLowerCase(),
    )
    .map((q) => ({
      ...q,
      options: processOptions(q?.options || []) || q?.options || [],
    }));
};

export const destructureQuestionData = (
  questionData: QuestionData[],
  availableTypes: QuestionType[],
): Question[] => {
  const destructuredQuestions = questionData.map((q) => {
    const { variants, ...rest } = q;

    const qList = availableTypes
      .filter((availableType) => availableType.available)
      .map((type) => {
        const key = type.slug as keyof typeof variants;
        const fallbackKey = Object.keys(variants)[0] as keyof typeof variants;

        const questionVariant = variants[key] || variants[fallbackKey];
        const variantId = q.id + "-" + type.idPrefix;

        const result = {
          variant: key,
          ...{ ...rest, id: variantId },
          ...questionVariant,
        };

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
  currentQuestionNum: number,
  selectedAnswer: string,
  userAnswers: Map<string, UserAnswer>,
): Map<string, UserAnswer> => {
  const map = new Map(userAnswers);
  const { answer } = currentQuestion || {};

  if (currentQuestion && selectedAnswer && selectedAnswer !== "") {
    map.set(currentQuestion.id, {
      questionId: currentQuestion.id,
      questionNum: currentQuestionNum,
      selectedAnswer,
      isCorrect: selectedAnswer === answer,
      correctAnswer: answer || "",
    });
  }
  return map;
};

export const getUnansweredQuestionIndexes = (
  questions: Question[],
  userAnswers: Map<string, UserAnswer>,
): number[] =>
  questions
    .map((q, i) => (userAnswers.has(q.id) ? -1 : i))
    .filter((i) => i !== -1);
