export const languageOptions = [
  {
    id: "kin",
    nativeName: "Ikinyarwanda",
    htmlLang: "kin-RW",
    formatLocale: "kin-RW",
    countryCode: "RW",
    direction: "ltr",
  },
  {
    id: "en",
    nativeName: "English",
    htmlLang: "en",
    formatLocale: "en",
    countryCode: null,
    direction: "ltr",
  },
  {
    id: "fr",
    nativeName: "Français",
    htmlLang: "fr",
    formatLocale: "fr",
    countryCode: null,
    direction: "ltr",
  },
  {
    id: "sw",
    nativeName: "Kiswahili",
    htmlLang: "sw",
    formatLocale: "sw",
    countryCode: null,
    direction: "ltr",
  },
  {
    id: "zh",
    nativeName: "简体中文",
    htmlLang: "zh-CN",
    formatLocale: "zh-CN",
    countryCode: "CN",
    direction: "ltr",
  },
  {
    id: "de",
    nativeName: "Deutsch",
    htmlLang: "de",
    formatLocale: "de",
    countryCode: null,
    direction: "ltr",
  },
  {
    id: "ar",
    nativeName: "العربية",
    htmlLang: "ar",
    formatLocale: "ar",
    countryCode: null,
    direction: "rtl",
  },
] as const;

export type LanguageId = (typeof languageOptions)[number]["id"];
export type TextDirection = (typeof languageOptions)[number]["direction"];

export const DEFAULT_LANGUAGE: LanguageId = "en";
export const LANGUAGE_COOKIE = "pathwise-language";

export function isLanguageId(value: string): value is LanguageId {
  return languageOptions.some((language) => language.id === value);
}

export function getLanguageOption(languageId: LanguageId) {
  return languageOptions.find((language) => language.id === languageId)!;
}

export function readLanguageCookie(value: string | undefined): LanguageId {
  return value && isLanguageId(value) ? value : DEFAULT_LANGUAGE;
}
