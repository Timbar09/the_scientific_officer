import { useEffect, useMemo, useState } from "react";

import {
  loadQuestionBank,
  type LoadedQuestionBank,
} from "../hooks/questionBank";
import { AppDataContext, type AppMetric } from "./AppDataContext";

export const AppDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questionBank, setQuestionBank] = useState<LoadedQuestionBank | null>(
    null,
  );
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await loadQuestionBank();

        if (isMounted) {
          setQuestionBank(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          const loadError =
            error instanceof Error
              ? error
              : new Error("Failed to load application data");

          setError(loadError);
        }
      } finally {
        if (isMounted) {
          setIsDataLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo<AppMetric[]>(() => {
    const questions = questionBank?.questions ?? [];
    const topics = new Set(
      questions.flatMap((question) => question.topics ?? []),
    );

    return [
      {
        title: "Total Questions",
        value: questions.reduce(
          (total, question) => total + Object.keys(question.variants).length,
          0,
        ),
      },
      {
        title: "Total Topics",
        value: topics.size,
      },
      {
        title: "Total Resources",
        value: 1_200,
      },
      {
        title: "Total Articles",
        value: 500,
      },
    ];
  }, [questionBank]);

  const value = useMemo(
    () => ({ questionBank, metrics, isDataLoading, error }),
    [questionBank, metrics, isDataLoading, error],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};
