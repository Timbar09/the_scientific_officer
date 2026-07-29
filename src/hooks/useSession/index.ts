import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import type {
  QuestionData,
  SessionSettings,
  SessionResults,
  UserAnswer,
} from "../../pages/practice/types";

import {
  getFilteredQuestions,
  getCurrentVariant,
  getAnswersWithCurrentSelection,
  getUnansweredQuestionIndexes,
} from "./utils";

import { fetchSessionData } from "./data";

const useSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state as SessionSettings | undefined;

  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [availableTypes, setAvailableTypes] = useState<Set<string>>(new Set());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedHintQuestionIds, setRevealedHintQuestionIds] = useState<
    Set<number>
  >(new Set());
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(
    new Map(),
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<SessionResults | null>(null);

  const load = useCallback(async () => {
    if (!settings) return;
    try {
      const { questions: list, availableTypes } = await fetchSessionData();
      setAvailableTypes(availableTypes);
      setQuestionData(list);
    } catch {
      setQuestionData([]);
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  useEffect(() => {
    if (!settings) {
      navigate("/practice", { replace: true });
      return;
    }
    void load();
  }, [navigate, settings, load]);

  const list = useMemo<(QuestionData & { variantKey?: string })[]>(() => {
    return getFilteredQuestions(questionData, settings, availableTypes);
  }, [questionData, settings, availableTypes]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [list.length]);

  const currentQuestion = list[currentQuestionIndex];

  const currentVariant = useMemo(() => {
    return getCurrentVariant(currentQuestion, settings, availableTypes);
  }, [currentQuestion, settings, availableTypes]);

  const answersWithCurrentSelection = useMemo(() => {
    return getAnswersWithCurrentSelection(
      currentQuestion,
      currentVariant,
      selectedAnswer,
      userAnswers,
    );
  }, [currentQuestion, currentVariant, selectedAnswer, userAnswers]);

  const unansweredQuestionIndexes = useMemo(
    () => getUnansweredQuestionIndexes(list, answersWithCurrentSelection),
    [list, answersWithCurrentSelection],
  );

  const unansweredCount = unansweredQuestionIndexes.length;
  const allQuestionsAnswered = unansweredCount === 0;

  const nextQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);
    setShowAnswer(false);
    setSelectedAnswer("");

    if (
      currentQuestionIndex === list.length - 1 &&
      unansweredQuestionIndexes.length > 0
    ) {
      setCurrentQuestionIndex(unansweredQuestionIndexes[0]);
      return;
    }

    setCurrentQuestionIndex((i) => (i + 1) % Math.max(list.length, 1));
  };

  const previousQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);
    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(
      (i) => (i - 1 + list.length) % Math.max(list.length, 1),
    );
  };

  const submit = () => {
    setUserAnswers(answersWithCurrentSelection);
    const all = Array.from(answersWithCurrentSelection.values());
    const correct = all.filter((a) => a.isCorrect).length;
    const wrong = all.filter((a) => !a.isCorrect);
    const score = Math.round((correct / Math.max(list.length, 1)) * 100);

    const r: SessionResults = {
      totalQuestions: list.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      score,
    };

    setResults(r);
    setIsComplete(true);
  };

  const revealHint = () => {
    if (!currentQuestion) return;
    setRevealedHintQuestionIds((s) => new Set(s).add(currentQuestion.id));
  };

  const current = {
    index: currentQuestionIndex,
    question: currentQuestion,
    variant: currentVariant,
    selectedAnswer:
      userAnswers.get(currentQuestion?.id ?? -1)?.selectedAnswer ||
      selectedAnswer,
    showAnswer,
  };

  const questions = {
    list,
    unansweredCount,
    loading: isLoading,
    areAllAnswered: allQuestionsAnswered,
    current,
  };

  return {
    settings,
    isComplete,
    results,
    questionData,
    questions,
    revealedHintQuestionIds,
    userAnswers: answersWithCurrentSelection,
    func: {
      nextQuestion,
      previousQuestion,
      submit,
      setSelectedAnswer,
      toggleAnswer: () => setShowAnswer((s) => !s),
      revealHint,
      goToPractice: () => navigate("/practice"),
    },
  };
};

export default useSession;
