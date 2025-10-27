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
        count: "Tap the number",
        shout: "Shout out loud!",
        tap: "Tap the numbers.\nShout out loud what you\nhear",
        one: "One",
        two: "Two",
        three: "Three",
        four: "Four",
        five: "Five",
        
      },
    },
  },
});

export default i18n;
