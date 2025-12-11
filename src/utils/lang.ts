/**
 * Supported language codes in the system
 */
export const SUPPORTED_LANGUAGES = Object.freeze(["ru", "en", "ky"] as const);

/**
 * Type for supported language codes
 */
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Type for language database IDs
 */
export type LanguageId = 1 | 2 | 3;

/**
 * Mapping between language codes and database IDs
 * Frozen for immutability and performance optimization
 */
const LANG_TO_ID_MAP = Object.freeze<Record<LanguageCode, LanguageId>>({
  ru: 1,
  en: 2,
  ky: 3,
} as const);

/**
 * Reverse mapping from language ID to language code
 * Frozen for immutability and performance optimization
 */
const ID_TO_LANG_MAP = Object.freeze<Record<LanguageId, LanguageCode>>({
  1: "ru",
  2: "en",
  3: "ky",
} as const);

/**
 * Default language code and ID
 */
export const DEFAULT_LANGUAGE_CODE: LanguageCode = "ru";
export const DEFAULT_LANGUAGE_ID: LanguageId = 1;

/**
 * Set of supported language codes for O(1) lookup
 * @internal
 */
const LANG_CODE_SET = Object.freeze(new Set<string>(SUPPORTED_LANGUAGES));

/**
 * Converts language code to database language ID
 * @param resolvedLanguage - Language code from i18next (optional)
 * @returns Language ID (1 for Russian, 2 for English, 3 for Kyrgyz)
 * @example
 * getLangId('ru') // returns 1
 * getLangId('en') // returns 2
 * getLangId('ky') // returns 3
 * getLangId() // returns 1 (default)
 * getLangId('unknown') // returns 1 (default)
 */
export function getLangId(resolvedLanguage?: string): LanguageId {
  if (!resolvedLanguage) {
    return DEFAULT_LANGUAGE_ID;
  }

  const langId = LANG_TO_ID_MAP[resolvedLanguage as LanguageCode];
  return langId ?? DEFAULT_LANGUAGE_ID;
}

/**
 * Converts language database ID to language code
 * @param langId - Language database ID
 * @returns Language code
 * @example
 * getLangCode(1) // returns 'ru'
 * getLangCode(2) // returns 'en'
 * getLangCode(3) // returns 'ky'
 */
export function getLangCode(langId: LanguageId): LanguageCode {
  return ID_TO_LANG_MAP[langId];
}

/**
 * Type guard to check if a string is a supported language code
 * Optimized with Set for O(1) lookup instead of O(n) array search
 * @param lang - String to check
 * @returns True if the string is a supported language code
 */
export function isLanguageCode(lang: string): lang is LanguageCode {
  return LANG_CODE_SET.has(lang);
}
