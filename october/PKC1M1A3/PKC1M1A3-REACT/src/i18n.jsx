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
        },
        instruction: {
          optionClick: "Click Option",
          tapNext: "Tap » for next question",
        },

        questions: {
          cat: {
            instruction:
              "Count the cats. Click each cat to keep track as you count.",
            question: "How many cats are there:",
          },
          dog: {
            instruction:
              "Count the dogs. Click each dog to keep track as you count.",
            question: "How many dogs are there:",
          },
          apple: {
            instruction:
              "Count the apples. Click each apple to keep track as you count.",
            question: "How many apples are there:",
          },
        },
        feedback: {
          correct: "Well Done!",
          incorrect: "Oops! That's Incorrect. Try Again.",
        },
      },
    },
  },
});

export default i18n;
