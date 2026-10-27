import { useEffect, useMemo, useState } from "react";
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

import { useAppData } from "../../context/useAppData";

const useSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state as SessionSettings | undefined;
  const { questionBank, isDataLoading, error } = useAppData();

  const [isLoading, setIsLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Map<string, UserAnswer>>(
    new Map(),
  );
  const [revealedHintQuestionIds, setRevealedHintQuestionIds] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    if (!settings) {
      navigate("/practice", { replace: true });
    }
  }, [navigate, settings]);

  useEffect(() => {
    if (!questionBank) {
      setQuestionData([]);
      setQuestionList([]);
      return;
    }

    setQuestionData(questionBank.questions);
    setQuestionList(
      destructureQuestionData(
        questionBank.questions,
        questionBank.questionTypes,
      ),
    );
    setIsLoading(false);
  }, [questionBank]);

  const list = useMemo<Question[]>(() => {
    return settings ? getSessionQuestions(questionList, settings) : [];
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
        questionNum: currentQuestionIndex + 1,
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
    const unanswered = all.filter((a) => a.selectedAnswer === "");
    const score = Math.round((correct / Math.max(list.length, 1)) * 100);

    const r: SessionResults = {
      totalQuestions: list.length,
      correctCount: correct,
      wrongAnswers: wrong,
      unansweredQuestions: unanswered,
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
    loading: isDataLoading || isLoading,
    error,
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
