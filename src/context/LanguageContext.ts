import { createContext } from "react";

export const SUPPORTED_LANGUAGES = ["en", "tn"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export type NavigationTranslations = {
  home: string;
  practice: string;
  resources: string;
  books: string;
  articles: string;
  videos: string;
  about: string;
  contribute: string;
};

export type HomeTranslations = {
  hero: {
    title: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  images: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
  };
};

export type Translations = {
  language: TranslationObject;
  navigation: NavigationTranslations;
  home: HomeTranslations;
  footer: TranslationObject;
  common: TranslationObject;
};

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations | null;
  isLoading: boolean;
  error: Error | null;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);
