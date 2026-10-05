import { shuffle } from "./shuffle";

/**
 * Shuffles the answer options in a random order, except for the option list that contains "All the above" option.
 *
 * @param array - The array of options to shuffle
 * @returns
 */

export function processOptions(options: string[]): string[] | undefined {
  const exception = "All the above";

  if (options.includes(exception)) {
    return options;
  }

  return shuffle(options);
}
