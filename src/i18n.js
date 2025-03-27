// i18n.js - Translation setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation resources
import enTranslations from "../public/locales/en/translation.json";
import azTranslations from "../public/locales/az/translation.json";

// Translation resources
const resources = {
  en: {
    translation: enTranslations,
  },
  az: {
    translation: azTranslations,
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
