import { createContext } from "react";

import type { LoadedQuestionBank } from "../hooks/questionBank";

export type AppMetric = {
  title: string;
  value: number;
};

export type AppDataContextValue = {
  questionBank: LoadedQuestionBank | null;
  metrics: AppMetric[];
  isDataLoading: boolean;
  error: Error | null;
};

export const AppDataContext = createContext<AppDataContextValue | undefined>(
  undefined,
);
