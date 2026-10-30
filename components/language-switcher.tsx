"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  DEFAULT_LANGUAGE,
  getLanguageOption,
  languageOptions,
  type LanguageId,
} from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";

export function LanguageSwitcher({ language }: { language: LanguageId }) {
  const formRef = useRef<HTMLFormElement>(null);
  const returnToRef = useRef<HTMLInputElement>(null);
  const languageInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = languageOptions.findIndex(
      (option) => option.id === selectedLanguage
    );
    optionRefs.current[selectedIndex]?.focus();

    function closeOnOutsidePointer(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !formRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen, selectedLanguage]);

  function preserveCurrentLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (returnToRef.current) {
      returnToRef.current.value = `${window.location.pathname}${window.location.search}`;
    }
    event.currentTarget.submit();
  }

  function chooseLanguage(option: LanguageId) {
    if (!languageInputRef.current || !formRef.current) return;

    languageInputRef.current.value = option;
    setSelectedLanguage(option);
    setIsOpen(false);
    formRef.current.requestSubmit();
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % languageOptions.length;
    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + languageOptions.length) % languageOptions.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = languageOptions.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      formRef.current?.querySelector("button")?.focus();
    } else if (event.key === "Tab") {
      setIsOpen(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="language-form"
      action="/api/language"
      method="post"
      onSubmit={preserveCurrentLocation}
    >
      <input
        ref={returnToRef}
        type="hidden"
        name="returnTo"
        value={pathname}
      />
      <input
        ref={languageInputRef}
        type="hidden"
        name="language"
        defaultValue={language || DEFAULT_LANGUAGE}
      />
      <label className="visually-hidden" htmlFor="pathwise-language">
        {translate(language, "nav.language", "Language")}
      </label>
      <button
        id="pathwise-language"
        className="language-trigger"
        type="button"
        aria-label={translate(language, "nav.chooseLanguage", "Choose language")}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="pathwise-language-menu"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span>{getLanguageOption(selectedLanguage).nativeName}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path
            d="m4 6 4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <div
        id="pathwise-language-menu"
        className="language-menu"
        role="menu"
        aria-label={translate(language, "nav.chooseLanguage", "Choose language")}
        hidden={!isOpen}
      >
        {languageOptions.map((option, index) => (
          <button
            key={option.id}
            ref={(element) => {
              optionRefs.current[index] = element;
            }}
            className="language-menu-option"
            type="button"
            role="menuitemradio"
            aria-checked={selectedLanguage === option.id}
            tabIndex={selectedLanguage === option.id ? 0 : -1}
            onClick={() => chooseLanguage(option.id)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
          >
            <span>{option.nativeName}</span>
            {selectedLanguage === option.id && (
              <svg aria-hidden="true" viewBox="0 0 16 16">
                <path
                  d="m3.5 8 3 3 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </form>
  );
}
