import type {
  Question,
  QuestionVariant,
  SessionSettings,
  UserAnswer,
} from "@/pages/practice/types";

type QuestionWithVariantKey = Question & { variantKey?: string };

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
  q: Question,
  availableTypes: Set<string>,
): string[] =>
  Object.keys(q.variants).filter(
    (k) => availableTypes.size === 0 || availableTypes.has(k.toLowerCase()),
  );

export const pickRandomVariant = (
  q: Question,
  availableTypes: Set<string>,
): QuestionVariant | undefined => {
  const keys = getAvailableVariantKeys(q, availableTypes);
  if (!keys.length) return undefined;
  const key = keys[Math.floor(Math.random() * keys.length)];
  return q.variants[key as keyof typeof q.variants];
};

export const getFilteredQuestions = (
  questions: Question[],
  settings: SessionSettings | undefined,
  availableTypes: Set<string>,
): QuestionWithVariantKey[] => {
  if (!settings) return [];
  const qType = settings.questionType.toLowerCase();

  const matches = questions.filter((q) =>
    q.topics.some((t) => settings.topics.includes(t)),
  );

  if (qType === "all") {
    const expanded: QuestionWithVariantKey[] = [];
    matches.forEach((q) =>
      getAvailableVariantKeys(q, availableTypes).forEach((key) =>
        expanded.push({ ...q, variantKey: key }),
      ),
    );
    return shuffle(expanded);
  }

  return shuffle(
    matches
      .filter((q) => Boolean(q.variants[qType as keyof typeof q.variants]))
      .map((q) => ({ ...q })),
  );
};

export const getCurrentVariant = (
  currentQuestion: QuestionWithVariantKey | undefined,
  settings: SessionSettings | undefined,
  availableTypes: Set<string>,
): QuestionVariant | undefined => {
  if (!currentQuestion || !settings) return undefined;
  const qType = settings.questionType.toLowerCase();
  if (qType === "all" && currentQuestion.variantKey) {
    return currentQuestion.variants[
      currentQuestion.variantKey as keyof typeof currentQuestion.variants
    ];
  }
  if (qType === "all")
    return pickRandomVariant(currentQuestion, availableTypes);
  return currentQuestion.variants[
    qType as keyof typeof currentQuestion.variants
  ];
};

export const getAnswersWithCurrentSelection = (
  currentQuestion: QuestionWithVariantKey | undefined,
  currentVariant: QuestionVariant | undefined,
  selectedAnswer: string,
  userAnswers: Map<number, UserAnswer>,
): Map<number, UserAnswer> => {
  const map = new Map(userAnswers);
  if (currentQuestion && currentVariant && selectedAnswer) {
    map.set(currentQuestion.id, {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: selectedAnswer === currentVariant.answer,
      correctAnswer: currentVariant.answer,
    });
  }
  return map;
};

export const getUnansweredQuestionIndexes = (
  filteredQuestions: QuestionWithVariantKey[],
  answersWithCurrentSelection: Map<number, UserAnswer>,
): number[] =>
  filteredQuestions
    .map((q, i) => (answersWithCurrentSelection.has(q.id) ? -1 : i))
    .filter((i) => i !== -1);

export default {
  shuffle,
  ensureTrueFalseOptions,
  getAvailableVariantKeys,
  pickRandomVariant,
  getFilteredQuestions,
  getCurrentVariant,
  getAnswersWithCurrentSelection,
  getUnansweredQuestionIndexes,
};
