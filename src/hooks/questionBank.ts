import type { QuestionData, QuestionType } from "../pages/practice/types";

// export type QuestionBankTopic = {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
// };

export type QuestionBankFile = {
  id: string;
  title: string;
  file: string;
  questionCount?: number;
};

export type QuestionBankIndex = {
  meta?: {
    version?: string;
    description?: string;
  };
  questionTypes?: QuestionType[];
  questionFiles?: QuestionBankFile[];
};

export type QuestionBankChapter = {
  meta?: {
    id?: string;
    title?: string;
    version?: string;
    topicIds?: string[];
  };
  questions?: QuestionData[];
};

export type LoadedQuestionBank = {
  questionTypes: QuestionType[];
  questionFiles: QuestionBankFile[];
  questions: QuestionData[];
};

const INDEX_PATH = "/question-bank/index.json";

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load question bank data from ${path}`);
  }

  return (await response.json()) as T;
};

export const loadQuestionBank = async (): Promise<LoadedQuestionBank> => {
  const index = await fetchJson<QuestionBankIndex>(INDEX_PATH);
  const questionFiles = index.questionFiles ?? [];

  console.log("Question Types:", index.questionTypes);

  const chapters = await Promise.all(
    questionFiles.map(async (file) => {
      return fetchJson<QuestionBankChapter>(`/question-bank/${file.file}`);
    }),
  );

  return {
    questionTypes: index.questionTypes ?? [],
    questionFiles,
    questions: chapters.flatMap((chapter) => chapter.questions ?? []),
  };
};
