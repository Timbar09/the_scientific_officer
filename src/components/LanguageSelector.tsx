import { useEffect, useRef, useState } from "react";
import { GB, BW } from "country-flag-icons/react/3x2";

import { SUPPORTED_LANGUAGES, type Language } from "../context/LanguageContext";
import { useLanguage } from "../context/useLanguage";

import Tooltip from "./Tooltip";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const getFlag = (option: Language) => {
    if (option === "en") {
      return <GB aria-label="English" />;
    } else if (option === "tn") {
      return <BW aria-label="Setswana" />;
    }
  };

  const getLanguageLabel = (option: Language) => {
    const translationKey = `language.${option === "en" ? "english" : "tswana"}`;
    const label = t(translationKey);
    const isTranslated = label === translationKey;

    const translatedLabel = isTranslated
      ? option === "en"
        ? "English"
        : "Setswana"
      : label;

    return <span>{translatedLabel}</span>;
  };

  const getName = (
    option: Language,
    format: "full" | "abbreviated" | "combined" = "combined",
  ) => {
    const fullName = option === "en" ? "Great Britain" : "Botswana";
    const abbreviatedName = option === "en" ? "GB" : "BW";

    if (format === "full") {
      return fullName;
    } else if (format === "abbreviated") {
      return abbreviatedName;
    } else {
      return `${fullName} (${abbreviatedName})`;
    }
  };

  const getTooltipText = (option: Language) => {
    const tswanaText = "Renola teme ya pheije";
    const englishText = "Translate the language of the page";

    return option === "en" ? englishText : tswanaText;
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectLanguage = (option: Language) => {
    setLanguage(option);
    setIsOpen(false);
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    option: Language,
  ) => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(option);

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectLanguage(option);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + SUPPORTED_LANGUAGES.length) %
        SUPPORTED_LANGUAGES.length;
      document
        .getElementById(`language-option-${SUPPORTED_LANGUAGES[nextIndex]}`)
        ?.focus();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={selectorRef}
      className="header__languageSelector flex ai-center gap-1"
    >
      <button
        type="button"
        className="header__languageSelector__trigger flex ai-center gap-1 p-block-3 p-inline-4"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("language.label")}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="header__languageSelector__option--item__label">
          {getName(language, "abbreviated")}
        </span>
        {getFlag(language)}

        <span aria-hidden="true" className="header__languageSelector__arrow" />

        {!isOpen && <Tooltip> {getTooltipText(language)} </Tooltip>}
      </button>

      {isOpen && (
        <ul
          className="header__languageSelector__option--list p-2 flex flex-col gap-1"
          role="listbox"
          aria-label={t("language.label")}
        >
          {SUPPORTED_LANGUAGES.map((option) => (
            <li
              id={`language-option-${option}`}
              className="header__languageSelector__option--item p-block-2 p-inline-2"
              key={option}
              role="option"
              tabIndex={0}
              aria-selected={language === option}
              onClick={() => selectLanguage(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, option)}
            >
              {getFlag(option)}

              <span className="header__languageSelector__option--item__label flex flex-col">
                <span>{getName(option)}</span>
                {getLanguageLabel(option)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
