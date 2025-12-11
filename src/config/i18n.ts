import i18next from "i18next";
import middleware from "i18next-http-middleware";
import Backend from "i18next-node-fs-backend";

import en from "../locales/en/translation.json";
import ky from "../locales/ky/translation.json";
import ru from "../locales/ru/translation.json";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE_CODE } from "../utils/lang";

/**
 * Translation resources with frozen structure for performance
 */
const resources = Object.freeze({
  ru: Object.freeze({ translation: ru }),
  en: Object.freeze({ translation: en }),
  ky: Object.freeze({ translation: ky }),
} as const);

/**
 * Initialize i18next with optimized configuration
 */
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    resources,
    defaultNS: "translation",
    lng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
      lookupQuerystring: "lang",
      lookupCookie: "lang",
      cookieSecure: process.env.NODE_ENV === "production",
      cookieSameSite: "lax",
    },
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    preload: [DEFAULT_LANGUAGE_CODE],
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    saveMissing: false,
    debug: false,
  });

export default middleware.handle(i18next);
