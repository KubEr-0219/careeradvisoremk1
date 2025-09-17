// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // ✅ Load translations from public/locales
  .use(LanguageDetector) // ✅ Detect user language
  .use(initReactI18next) // ✅ Bind i18n to React
  .init({
    fallbackLng: "en", // Default language if not found
    debug: true, // Show debug info in console

    interpolation: {
      escapeValue: false, // React already escapes
    },

    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // ✅ JSON file path
    },

    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"], // Save user preference
    },
  });

export default i18n;
