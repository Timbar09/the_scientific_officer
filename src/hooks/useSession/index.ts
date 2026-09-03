import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import type {
  QuestionData,
  SessionSettings,
  SessionResults,
  UserAnswer,
  Question,
} from "../../pages/practice/types";

import {
  destructureQuestionData,
  getSessionQuestions,
  getUnansweredQuestionIndexes,
} from "./utils";

import { fetchSessionData } from "./data";

const useSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state as SessionSettings | undefined;

  const [isLoading, setIsLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(
    new Map(),
  );
  const [revealedHintQuestionIds, setRevealedHintQuestionIds] = useState<
    Set<number>
  >(new Set());

  const load = useCallback(async () => {
    if (!settings) return;
    try {
      const { questions: qData, availableTypes } = await fetchSessionData();
      const questions = destructureQuestionData(qData, availableTypes);

      setQuestionData(qData);
      setQuestionList(questions);
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

  const list = useMemo<Question[]>(() => {
    return getSessionQuestions(questionList, settings as SessionSettings);
  }, [questionList, settings]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [list.length]);

  const currentQuestion = list[currentQuestionIndex];

  const unansweredQuestionIndexes = useMemo(
    () => getUnansweredQuestionIndexes(list, userAnswers),
    [list, userAnswers],
  );

  const unansweredCount = unansweredQuestionIndexes.length;
  const allQuestionsAnswered = unansweredCount === 0;

  const nextQuestion = () => {
    setCurrentQuestionIndex((i) => (i + 1) % Math.max(list.length, 1));
    setShowAnswer(false);
    setSelectedAnswer("");

    if (
      currentQuestionIndex === list.length - 1 &&
      unansweredQuestionIndexes.length > 0
    ) {
      setCurrentQuestionIndex(unansweredQuestionIndexes[0]);
      return;
    }
  };

  const jumpToQuestion = (index: number) => {
    if (index < 0 || index >= list.length) return;
    setCurrentQuestionIndex(index);
    setShowAnswer(false);
    setSelectedAnswer("");
  };

  const onSelectAnswer = (answer: string) => {
    if (!currentQuestion) return;

    setUserAnswers((prev) => {
      const updated = new Map(prev);

      updated.set(currentQuestion.id, {
        questionId: currentQuestion.id,
        selectedAnswer: answer,
        isCorrect: answer === currentQuestion.answer,
        correctAnswer: currentQuestion.answer,
      });

      return updated;
    });

    setSelectedAnswer(answer);
  };

  const previousQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(
      (i) => (i - 1 + list.length) % Math.max(list.length, 1),
    );
  };

  const submit = () => {
    const all = Array.from(userAnswers.values());
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
    setIsSubmitted(true);
  };

  const revealHint = () => {
    if (!currentQuestion) return;
    setRevealedHintQuestionIds((s) => new Set(s).add(currentQuestion.id));
  };

  const current = {
    index: currentQuestionIndex,
    question: currentQuestion,
    selectedAnswer:
      userAnswers.get(currentQuestion?.id ?? -1)?.selectedAnswer ||
      selectedAnswer,
    showAnswer,
  };

  const questions = {
    list,
    count: list.length,
    unansweredCount,
    loading: isLoading,
    areAllAnswered: allQuestionsAnswered,
    current,
  };

  return {
    settings,
    isSubmitted,
    results,
    questionData,
    questions,
    revealedHintQuestionIds,
    userAnswers,
    func: {
      onSelectAnswer,
      nextQuestion,
      previousQuestion,
      submit,
      toggleAnswer: () => setShowAnswer((s) => !s),
      revealHint,
      jumpToQuestion,
      goToPractice: () => navigate("/practice"),
    },
  };
};

export default useSession;
