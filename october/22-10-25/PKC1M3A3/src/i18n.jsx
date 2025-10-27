import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        buttons: {
          next: "NEXT",
          Next: "»",
          previous: "«",
          startOver: "Start\n Over",
        },
        count: "Counting using numbers",
        shout: "Shout out loud!",
        tap: "Tap the speaker icon to listen the number",
      },
    },
  },
});

export default i18n;
