import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import type {
  Question,
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

  const [questions, setQuestions] = useState<Question[]>([]);
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
      const { questions: qs, availableTypes } = await fetchSessionData();
      setAvailableTypes(availableTypes);
      setQuestions(qs);
    } catch {
      setQuestions([]);
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

  const filteredQuestions = useMemo<
    (Question & { variantKey?: string })[]
  >(() => {
    return getFilteredQuestions(questions, settings, availableTypes);
  }, [questions, settings, availableTypes]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [filteredQuestions.length]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

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
    () =>
      getUnansweredQuestionIndexes(
        filteredQuestions,
        answersWithCurrentSelection,
      ),
    [filteredQuestions, answersWithCurrentSelection],
  );

  const unansweredCount = unansweredQuestionIndexes.length;
  const allQuestionsAnswered = unansweredCount === 0;

  const nextQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);
    setShowAnswer(false);
    setSelectedAnswer("");

    if (
      currentQuestionIndex === filteredQuestions.length - 1 &&
      unansweredQuestionIndexes.length > 0
    ) {
      setCurrentQuestionIndex(unansweredQuestionIndexes[0]);
      return;
    }

    setCurrentQuestionIndex(
      (i) => (i + 1) % Math.max(filteredQuestions.length, 1),
    );
  };

  const previousQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);
    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(
      (i) =>
        (i - 1 + filteredQuestions.length) %
        Math.max(filteredQuestions.length, 1),
    );
  };

  const submit = () => {
    setUserAnswers(answersWithCurrentSelection);
    const all = Array.from(answersWithCurrentSelection.values());
    const correct = all.filter((a) => a.isCorrect).length;
    const wrong = all.filter((a) => !a.isCorrect);
    const score = Math.round(
      (correct / Math.max(filteredQuestions.length, 1)) * 100,
    );

    const r: SessionResults = {
      totalQuestions: filteredQuestions.length,
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

  return {
    settings,
    isLoading,
    isComplete,
    results,
    questions,
    filteredQuestions,
    currentQuestionIndex,
    currentQuestion,
    currentVariant,
    showAnswer,
    isHintRevealed: Boolean(
      currentQuestion && revealedHintQuestionIds.has(currentQuestion.id),
    ),
    selectedAnswer,
    unansweredCount,
    allQuestionsAnswered,
    nextQuestion,
    previousQuestion,
    submit,
    setSelectedAnswer,
    toggleAnswer: () => setShowAnswer((s) => !s),
    revealHint,
    goToPractice: () => navigate("/practice"),
  };
};

export default useSession;
