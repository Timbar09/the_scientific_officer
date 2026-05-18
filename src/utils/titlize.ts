/**
 * Converts a string to Title Case, replacing hyphens with spaces and capitalizing each word.
 *
 * @param string - The input string to convert, typically in kebab-case format.
 * @returns The converted string in Title Case format.
 */
export function titlize(string: string): string {
  let titlizedString = string;

  if (containsHyphen(string)) {
    titlizedString = titlizeHyphened(string);
  }

  if (containsForwardSlash(string)) {
    titlizedString = titlizeForwardSlashed(string);
  }

  return titlizeSpaced(titlizedString);
}

function containsHyphen(string: string): boolean {
  return string.includes("-");
}

function containsForwardSlash(string: string): boolean {
  return string.includes("/");
}

function titlizeForwardSlashed(string: string): string {
  return string
    .split("/")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("/");
}

function titlizeHyphened(string: string): string {
  return string
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function titlizeSpaced(string: string): string {
  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
