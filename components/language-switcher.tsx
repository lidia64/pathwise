"use client";

import { usePathname } from "next/navigation";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import {
  DEFAULT_LANGUAGE,
  languageOptions,
  type LanguageId,
} from "@/lib/i18n/languages";
import { translate } from "@/lib/i18n/translations";

export function LanguageSwitcher({ language }: { language: LanguageId }) {
  const returnToRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  function preserveCurrentLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (returnToRef.current) {
      returnToRef.current.value = `${window.location.pathname}${window.location.search}`;
    }
    event.currentTarget.submit();
  }

  function submitLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <form
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
      <label className="visually-hidden" htmlFor="pathwise-language">
        {translate(language, "nav.language", "Language")}
      </label>
      <select
        id="pathwise-language"
        name="language"
        defaultValue={language || DEFAULT_LANGUAGE}
        aria-label={translate(language, "nav.chooseLanguage", "Choose language")}
        onChange={submitLanguageChange}
      >
        {languageOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nativeName}
          </option>
        ))}
      </select>
    </form>
  );
}
