/**
 * Converts a string to Title Case, replacing hyphens with spaces and capitalizing each word.
 *
 * @param string - The input string to convert, typically in kebab-case format.
 * @returns The converted string in Title Case format.
 */
export function titlize(string: string): string {
  if (containsHyphen(string)) {
    return titlizeHyphened(string);
  }

  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function containsHyphen(string: string): boolean {
  return string.includes("-");
}

function titlizeHyphened(string: string): string {
  return string
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
