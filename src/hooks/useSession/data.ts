import type { Question } from "../../pages/practice/types";
import { ensureTrueFalseOptions } from "./utils";

export async function fetchSessionData(): Promise<{
  questions: Question[];
  availableTypes: Set<string>;
}> {
  const resp = await fetch("/practice-questions.json");
  const data = (await resp.json()) as unknown as {
    questions?: Question[];
    questionTypes?: Array<{ name: string; available: boolean }>;
  };

  const questions = (data.questions ?? []).map((q) => ({
    ...q,
    variants: Object.fromEntries(
      Object.entries(q.variants).map(([k, v]) => [
        k,
        ensureTrueFalseOptions(v, k),
      ]),
    ) as typeof q.variants,
  }));

  const available = new Set(
    (data.questionTypes ?? [])
      .filter((t) => t.available)
      .map((t) => t.name.toLowerCase()),
  );

  return { questions, availableTypes: available };
}

export default { fetchSessionData };
