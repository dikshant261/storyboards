import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        buttons: {
          previous: "«",
          next: "»",
          show: "Show",
          check: "Check",
          hide: "Hide",
          hint: "Hint",
          startOver: "START OVER",
          start: "START",
          close: "Close",
          divide: "÷",
        },
        instruction: {
          tapNext: "Tap ”÷“ to start.",
          tapProceed: "Tap » to proceed.",
          tapQuotient: "Tap the correct quotient.",
          tapRemainder: "Tap the correct remainder.",
          next: "Tap »",
        },
        titles: {
          imporoperFraction: "Improper Fraction",
          division: "Division",
          mixedNumber: "Mixed Number",
        },
        sceneOne: {
          heading:
            "Let’s convert the given fraction into a mixed number using division.",
          tapFraction: "The fraction",
          means: "means {{dividend}} divided by {{divisor}}.",
        },
        sceneTwo: {
          divide:
            "Divide {{dividend}} by {{divisor}}.Notice how the fraction is represented as a mixed number.",
          mixedNumber: "The mixed number representation of",
          is: "is",
        },
      },
    },
  },
});

export default i18n;
