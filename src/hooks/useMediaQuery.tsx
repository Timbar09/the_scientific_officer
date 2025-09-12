import { useEffect, useState } from "react";

/**
 * A custom React hook to determine if the current viewport matches a specified media query breakpoint.
 *
 * @param {Object} props - The properties for the hook.
 * @param {string} props.breakpoint - The breakpoint to match (e.g. 'sm', 'md', 'lg').
 * @param {string} [props.direction='up'] - The direction of the media query ('up' for min-width, 'down' for max-width).
 * @returns {boolean} - True if the viewport matches the media query, false otherwise.
 */

export const BREAKPOINTS: { [key: string]: string } = {
  sm: "30em",
  md: "45em",
  lg: "65em",
};

interface props {
  breakpoint: string;
  direction?: "up" | "down";
}

const useMediaQuery = ({ breakpoint, direction = "up" }: props): boolean => {
  const query = `(${direction === "up" ? "min" : "max"}-width: ${
    BREAKPOINTS[breakpoint]
  })`;
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = useState<boolean>(() =>
    isClient ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient) return;

    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", listener);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query, isClient]);

  return matches;
};

export default useMediaQuery;
