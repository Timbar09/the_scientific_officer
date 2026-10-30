import { useCallback, useEffect, useMemo, useState } from "react";

import {
  LanguageContext,
  SUPPORTED_LANGUAGES,
  type Language,
  type Translations,
} from "./LanguageContext";

const LANGUAGE_STORAGE_KEY = "scientific-officer-language";
const DEFAULT_LANGUAGE: Language = "en";

const getStoredLanguage = (): Language => {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(storedLanguage as Language)
      ? (storedLanguage as Language)
      : DEFAULT_LANGUAGE;
  } catch (error) {
    console.error("Failed to read the saved language:", error);
    return DEFAULT_LANGUAGE;
  }
};

const getTranslation = (
  translations: Translations | null,
  key: string,
): string => {
  if (!translations) {
    console.warn("Translations not loaded yet.");
    return key;
  }

  const value = key.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[segment];
  }, translations);

  return typeof value === "string" ? value : key;
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);
  const [translations, setTranslations] = useState<Translations>(
    {} as Translations,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for "${language}"`);
        }

        const data = (await response.json()) as Translations;
        if (isMounted) {
          setTranslations(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          const loadError =
            error instanceof Error
              ? error
              : new Error(`Failed to load translations for "${language}"`);

          console.error("Failed to load translations:", loadError);
          setTranslations({} as Translations);
          setError(loadError);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch (error) {
      console.error("Failed to save the selected language:", error);
    }
  }, []);

  const t = useCallback(
    (key: string) => getTranslation(translations, key),
    [translations],
  );

  const value = useMemo(
    () => ({ language, setLanguage, translations, isLoading, error, t }),
    [language, setLanguage, translations, isLoading, error, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
