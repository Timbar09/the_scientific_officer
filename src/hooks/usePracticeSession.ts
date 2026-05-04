import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import type {
  PracticeData,
  PracticeQuestion,
  PracticeSettings,
  PracticeQuestionVariant,
  SessionResults,
  UserAnswer,
} from "../pages/practice/types";

export interface Session {
  settings: PracticeSettings | undefined;
  isLoading: boolean;
  isComplete: boolean;
  results: SessionResults | null;
  questions: PracticeQuestion[];
  filteredQuestions: PracticeQuestion[];
  currentQuestionIndex: number;
  currentQuestion: PracticeQuestion | undefined;
  currentVariant: PracticeQuestionVariant | undefined;
  showAnswer: boolean;
  secondsRemaining: number;
  selectedAnswer: string;
  unansweredCount: number;
  allQuestionsAnswered: boolean;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submit: () => void;
  setSelectedAnswer: (value: string) => void;
  toggleAnswer: () => void;
  goToPractice: () => void;
}

const usePracticeSession = (): Session => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state as PracticeSettings | undefined;

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(
    new Map(),
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<SessionResults | null>(null);

  useEffect(() => {
    if (!settings) {
      navigate("/practice", { replace: true });
      return;
    }

    const loadQuestions = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as PracticeData;
      const { questions } = data;
      setQuestions(questions);
      setIsLoading(false);
    };

    loadQuestions().catch(() => setIsLoading(false));
  }, [navigate, settings]);

  useEffect(() => {
    if (settings?.timePractice) {
      setSecondsRemaining(settings.practiceDuration * 60);
    }
  }, [settings]);

  useEffect(() => {
    if (!settings?.timePractice) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [settings?.timePractice]);

  const filteredQuestions = useMemo(() => {
    if (!settings) {
      return [];
    }

    return questions.filter(
      (question) =>
        question.topics.some((topic) => settings.topics.includes(topic)) &&
        Boolean(question.variants[settings.questionType]),
    );
  }, [questions, settings]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [filteredQuestions.length]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const currentVariant =
    currentQuestion?.variants[settings?.questionType ?? "multiple choice"];

  const answersWithCurrentSelection = useMemo(() => {
    const updatedAnswers = new Map(userAnswers);

    if (currentQuestion && currentVariant && selectedAnswer) {
      updatedAnswers.set(currentQuestion.id, {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: selectedAnswer === currentVariant.answer,
        correctAnswer: currentVariant.answer,
      });
    }

    return updatedAnswers;
  }, [currentQuestion, currentVariant, selectedAnswer, userAnswers]);

  const unansweredQuestionIndexes = useMemo(
    () =>
      filteredQuestions
        .map((question, index) =>
          answersWithCurrentSelection.has(question.id) ? -1 : index,
        )
        .filter((index) => index !== -1),
    [answersWithCurrentSelection, filteredQuestions],
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
      (currentIndex) => (currentIndex + 1) % filteredQuestions.length,
    );
  };

  const previousQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);

    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(
      (currentIndex) =>
        (currentIndex - 1 + filteredQuestions.length) %
        filteredQuestions.length,
    );
  };

  const submit = () => {
    setUserAnswers(answersWithCurrentSelection);

    const correctCount = Array.from(
      answersWithCurrentSelection.values(),
    ).filter((answer) => answer.isCorrect).length;
    const wrongAnswers = Array.from(
      answersWithCurrentSelection.values(),
    ).filter((answer) => !answer.isCorrect);
    const score = Math.round((correctCount / filteredQuestions.length) * 100);

    const results: SessionResults = {
      totalQuestions: filteredQuestions.length,
      correctAnswers: correctCount,
      wrongAnswers,
      score,
    };

    setResults(results);
    setIsComplete(true);
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
    secondsRemaining,
    selectedAnswer,
    unansweredCount,
    allQuestionsAnswered,
    nextQuestion,
    previousQuestion,
    submit,
    setSelectedAnswer,
    toggleAnswer: () =>
      setShowAnswer((currentShowAnswer) => !currentShowAnswer),
    goToPractice: () => navigate("/practice"),
  };
};

export default usePracticeSession;
